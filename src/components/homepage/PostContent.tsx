import { Emoji } from 'emoji-picker-react';

type PostContentProps = {
	content: string;
};

const PostContent = ({ content }: PostContentProps) => {
	const commentWithEmojis = content.split(' ').map((word, idx) => {
		if (word.startsWith(':') && word.endsWith(':')) {
			const emojiCode = word.substring(1, word.length - 1);
			return (
				<span key={idx}>
					<Emoji unified={emojiCode} size={23} />
				</span>
			);
		}
		return word + ' ';
	});

	return commentWithEmojis;
};

export default PostContent;
