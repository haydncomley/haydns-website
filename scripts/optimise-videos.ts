#!/usr/bin/env bun
import { spawn } from 'node:child_process';
import { readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'public/modules');
const VIDEO_EXTS = new Set(['.mov', '.mp4', '.m4v', '.mkv', '.avi', '.m2ts']);

const args = new Set(process.argv.slice(2));
const force = args.has('--force');
const deleteSource = args.has('--delete-source');
const dryRun = args.has('--dry-run');

if (args.has('--help') || args.has('-h')) {
	console.log(`Usage: bun run scripts/optimise-videos.ts [flags]

Scans public/modules for non-webm videos and converts them to optimised webm
(VP9 / Opus, max 1920px wide, 30fps).

Flags:
  --force            Re-encode even if a sibling .webm already exists.
  --delete-source    Remove the original file after a successful conversion.
  --dry-run          List what would be converted without running ffmpeg.
  -h, --help         Show this help.`);
	process.exit(0);
}

const walk = async (dir: string): Promise<string[]> => {
	const entries = await readdir(dir, { withFileTypes: true });
	const results: string[] = [];

	for (const entry of entries) {
		const entryPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			results.push(...(await walk(entryPath)));
		} else if (entry.isFile()) {
			results.push(entryPath);
		}
	}

	return results;
};

const run = (cmd: string, cmdArgs: string[]) =>
	new Promise<void>((resolve, reject) => {
		const child = spawn(cmd, cmdArgs, { stdio: 'inherit' });
		child.on('error', reject);
		child.on('exit', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`${cmd} exited with code ${code}`));
			}
		});
	});

const formatBytes = (bytes: number) => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
};

const fileExists = async (filePath: string) => {
	try {
		await stat(filePath);
		return true;
	} catch {
		return false;
	}
};

const optimise = async (source: string) => {
	const dir = path.dirname(source);
	const base = path.basename(source, path.extname(source));
	const output = path.join(dir, `${base}.webm`);
	const relSource = path.relative(process.cwd(), source);
	const relOutput = path.relative(process.cwd(), output);

	if (await fileExists(output)) {
		if (!force) {
			console.log(`↷ skip  ${relSource} (sibling .webm exists)`);
			return { skipped: true };
		}
	}

	console.log(`→ encode ${relSource} → ${relOutput}`);

	if (dryRun) {
		return { skipped: false, dryRun: true };
	}

	await run('ffmpeg', [
		'-hide_banner',
		'-loglevel', 'error',
		'-stats',
		'-y',
		'-i', source,
		'-c:v', 'libvpx-vp9',
		'-crf', '32',
		'-b:v', '0',
		'-row-mt', '1',
		'-deadline', 'good',
		'-cpu-used', '2',
		'-auto-alt-ref', '1',
		'-lag-in-frames', '25',
		'-pix_fmt', 'yuv420p',
		'-vf', "scale='min(1920,iw)':-2,fps=fps=30",
		'-c:a', 'libopus',
		'-b:a', '96k',
		output,
	]);

	const [srcStat, outStat] = await Promise.all([stat(source), stat(output)]);
	const saved = srcStat.size - outStat.size;
	const pct = srcStat.size > 0 ? (saved / srcStat.size) * 100 : 0;
	console.log(
		`  ✔ ${formatBytes(srcStat.size)} → ${formatBytes(outStat.size)} (${saved >= 0 ? 'saved' : 'grew'} ${formatBytes(Math.abs(saved))}, ${pct.toFixed(1)}%)`,
	);

	if (deleteSource) {
		await rm(source);
		console.log(`  ✂ removed ${relSource}`);
	}

	return { skipped: false };
};

const main = async () => {
	if (!(await fileExists(ROOT))) {
		console.error(`Root not found: ${ROOT}`);
		process.exit(1);
	}

	const files = await walk(ROOT);
	const videos = files.filter((file) =>
		VIDEO_EXTS.has(path.extname(file).toLowerCase()),
	);

	if (videos.length === 0) {
		console.log('No non-webm videos found under public/modules.');
		return;
	}

	console.log(
		`Found ${videos.length} candidate video${videos.length === 1 ? '' : 's'}${dryRun ? ' (dry run)' : ''}.\n`,
	);

	let converted = 0;
	let skipped = 0;
	let failed = 0;

	for (const video of videos) {
		try {
			const result = await optimise(video);
			if (result?.skipped) {
				skipped += 1;
			} else {
				converted += 1;
			}
		} catch (error) {
			failed += 1;
			const message = error instanceof Error ? error.message : String(error);
			console.error(`  ✗ failed: ${message}`);
		}
	}

	console.log(
		`\nDone. ${converted} converted, ${skipped} skipped, ${failed} failed.`,
	);

	if (failed > 0) {
		process.exit(1);
	}
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
