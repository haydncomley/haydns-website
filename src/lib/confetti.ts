type Vec2 = {
	x: number;
	y: number;
};

class Config {
	gravity: number = 10;
	particle_count: number = 75;
	particle_size: number = 1;
	explosion_power: number = 25;
	destroy_target: boolean = true;
	fade: boolean = false;
}

class Particle {
	private size: Vec2;
	private position: Vec2;
	private velocity: Vec2;
	private rotation: number;
	private rotation_speed: number;
	private hue: number;
	private opacity: number;
	private lifetime: number;

	constructor(position: Vec2) {
		this.size = {
			x: (16 * Math.random() + 4) * Confetti.CONFIG.particle_size,
			y: (4 * Math.random() + 4) * Confetti.CONFIG.particle_size,
		};
		this.position = {
			x: position.x - this.size.x / 2,
			y: position.y - this.size.y / 2,
		};
		this.velocity = Confetti.generateVelocity();
		this.rotation = Math.random() * 360;
		this.rotation_speed = (Math.random() - 0.5) * 10;
		this.hue = Math.random() * 360;
		this.opacity = 100;
		this.lifetime = Math.random() + 0.25;
	}

	update(deltaTime: number): void {
		this.velocity.y +=
			Confetti.CONFIG.gravity *
			(this.size.y / (10 * Confetti.CONFIG.particle_size)) *
			deltaTime;
		this.velocity.x += (Math.random() - 0.5) * 25 * deltaTime;
		this.velocity.y *= 0.98;
		this.velocity.x *= 0.98;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.rotation += this.rotation_speed;

		if (Confetti.CONFIG.fade) {
			this.opacity -= this.lifetime;
		}
	}

	checkBounds(): boolean {
		return this.position.y - this.size.x * 2 > window.innerHeight * 2;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.beginPath();
		ctx.translate(
			this.position.x + this.size.x / 2,
			this.position.y + this.size.y / 2,
		);
		ctx.rotate((this.rotation * Math.PI) / 180);
		ctx.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
		ctx.fillStyle = `hsla(${this.hue}deg, 90%, 65%, ${this.opacity}%)`;
		ctx.fill();
		ctx.restore();
	}
}

class Burst {
	particles: Particle[] = [];

	constructor(position: Vec2) {
		for (let i = 0; i < Confetti.CONFIG.particle_count; i++) {
			this.particles.push(new Particle(position));
		}
	}

	update(deltaTime: number): void {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].update(deltaTime);
			if (this.particles[i].checkBounds()) {
				this.particles.splice(i, 1);
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.particles.forEach((particle) => particle.draw(ctx));
	}
}

export class Confetti {
	private static CTX: CanvasRenderingContext2D | null = null;
	public static CONFIG: Config = new Config();

	private element: HTMLElement | null = null;
	private bursts: Burst[] = [];
	private time: number;
	private deltaTime: number;

	constructor(elementId: string) {
		if (!elementId) throw new Error('Missing id');

		this.time = new Date().getTime();
		this.deltaTime = 0;
		this.setupCanvasContext();
		this.setupElement(elementId);
		window.requestAnimationFrame(this.update.bind(this));
	}

	private setupCanvasContext(): void {
		if (!Confetti.CTX) {
			const canvas = document.createElement('canvas');
			Confetti.CTX = canvas.getContext('2d');
			if (!Confetti.CTX) throw new Error('Could not get canvas context');

			canvas.width = window.innerWidth * 2;
			canvas.height = window.innerHeight * 2;
			canvas.style.position = 'fixed';
			canvas.style.top = '0';
			canvas.style.left = '0';
			canvas.style.width = 'calc(100%)';
			canvas.style.height = 'calc(100%)';
			canvas.style.margin = '0';
			canvas.style.padding = '0';
			canvas.style.zIndex = '999999999';
			canvas.style.pointerEvents = 'none';

			document.body.appendChild(canvas);

			window.addEventListener('resize', () => {
				canvas.width = window.innerWidth * 2;
				canvas.height = window.innerHeight * 2;
			});
		}
	}

	private setupElement(elementId: string): void {
		this.element = document.getElementById(elementId);
		this.element?.addEventListener('click', (e: MouseEvent) => {
			const position = {
				x: e.clientX * 2,
				y: e.clientY * 2,
			};
			this.bursts.push(new Burst(position));

			if (Confetti.CONFIG.destroy_target && this.element) {
				this.element.style.visibility = 'hidden';
			}
		});
	}

	private update(timestamp: number): void {
		this.deltaTime = (timestamp - this.time) / 1000;
		this.time = timestamp;

		for (let i = this.bursts.length - 1; i >= 0; i--) {
			this.bursts[i].update(this.deltaTime);
			if (this.bursts[i].particles.length === 0) {
				this.bursts.splice(i, 1);
			}
		}

		this.draw();
		window.requestAnimationFrame(this.update.bind(this));
	}

	private draw(): void {
		if (!Confetti.CTX) return;
		Confetti.CTX.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
		this.bursts.forEach((burst) => burst.draw(Confetti.CTX!));
	}

	public static generateVelocity(): Vec2 {
		const x = Math.random() - 0.5;
		const y = Math.random() - 0.7;
		const magnitude = Math.sqrt(x * x + y * y);

		return {
			x: (x / magnitude) * (Math.random() * Confetti.CONFIG.explosion_power),
			y: (y / magnitude) * (Math.random() * Confetti.CONFIG.explosion_power),
		};
	}

	// Configuration methods
	setCount(count: number): void {
		if (typeof count !== 'number')
			throw new Error("Input must be of type 'number'");
		Confetti.CONFIG.particle_count = count;
	}

	setPower(power: number): void {
		if (typeof power !== 'number')
			throw new Error("Input must be of type 'number'");
		Confetti.CONFIG.explosion_power = power;
	}

	setSize(size: number): void {
		if (typeof size !== 'number')
			throw new Error("Input must be of type 'number'");
		Confetti.CONFIG.particle_size = size;
	}

	setFade(fade: boolean): void {
		if (typeof fade !== 'boolean')
			throw new Error("Input must be of type 'boolean'");
		Confetti.CONFIG.fade = fade;
	}

	destroyTarget(destroy: boolean): void {
		if (typeof destroy !== 'boolean')
			throw new Error("Input must be of type 'boolean'");
		Confetti.CONFIG.destroy_target = destroy;
	}
}
