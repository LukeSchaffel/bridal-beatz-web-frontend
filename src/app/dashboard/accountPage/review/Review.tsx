import { Avatar, List, Rate } from 'antd'

const Review = ({ review }: { review: Review }) => {
	return (
		<List.Item>
			<List.Item.Meta
				avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${review.review_id}`} />}
				title={
					<>
						{review.creator.first_name} {review.creator.last_name}
					</>
				}
				description={
					<div>
						<div>
							<Rate defaultValue={review.rating} allowClear />
						</div>
						<>{review.content}</>
					</div>
				}
			/>
		</List.Item>
	)
}

export default Review
