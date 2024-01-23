import { useEffect, useState } from 'react'
import { Col, List, Progress, Row, Spin, Typography, Rate } from 'antd'

import { useAppDispatch, useTypedSelector } from '../../../hooks'
import { getReviews } from '../../../../features/reviews/reviews.slice'
import Review from '../review/Review'

const ReviewList = ({ account }: { account: Account }) => {
	const dispatch = useAppDispatch()
	const { reviews, status } = useTypedSelector((state) => state.reviews)

	useEffect(() => {
		if (account?.account_id) {
			dispatch(getReviews(account.account_id))
		}
	}, [account])

	if (!account) {
		return <Spin />
	}

	const ratings: { [key: number]: number } = reviews.reduce(
		(acc, review: Review) => {
			const num = Math.floor(review.rating)
			if (num in acc) {
				acc[num]++
			} else {
				acc[num] = 1
			}
			return acc
		},
		{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
	)

	const totalReviews = reviews.length
	const averageReview = Math.floor(reviews.reduce((a, b) => a + b.rating, 0) / totalReviews)

	return (
		<>
			<Typography.Title level={3} style={{ marginTop: 0 }}>
				Reviews
			</Typography.Title>
			<Typography.Title level={5}>Overall rating</Typography.Title>
			<Rate defaultValue={averageReview} />
			<Typography.Title level={4}> {totalReviews} reviews </Typography.Title>
			<div style={{ marginTop: 10, marginBottom: 10 }}>
				{Object.entries(ratings)
					.reverse()
					.map(([rating, amount]) => {
						const percent = (amount / totalReviews) * 100
						return (
							<Row wrap={false} gutter={[16, 16]} align={'middle'}>
								<Col>
									{rating} Stars ({amount})
								</Col>
								<Col flex={1}>
									<Progress percent={percent} showInfo={false} />
								</Col>
							</Row>
						)
					})}
			</div>
			<List
				loading={status === 'pending'}
				pagination={{ position: 'bottom', align: 'center' }}
				dataSource={reviews}
				renderItem={(item: Review, index) => <Review review={item} key={item.review_id} />}
			/>
		</>
	)
}

export default ReviewList
