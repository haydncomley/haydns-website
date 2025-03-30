import styles from './wiggle-text.module.css';

type WiggleTextProps = {
	content: string;
};

export const WiggleText = ({ content }: WiggleTextProps) =>
	content.split('').map((char, index) => (
		<span
			className={styles.wiggle}
			key={index}
			style={{ animationDelay: `-${index * 0.1}s` }}
		>
			{char.trim() ? char : undefined}
		</span>
	));
