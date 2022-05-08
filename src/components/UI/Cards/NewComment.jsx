import "./NewComment.css";
export const NewComment = ({ toggleModal, columnTitle, setColumnName }) => {
	
  const handleClick = () => {
		setColumnName(columnTitle);
		toggleModal();
	};

	return (
		<div onClick={handleClick} className="new-comment-wrapper">
			<i className="fas fa-plus"></i>
			<p>add feedback</p>
		</div>
	);
};
