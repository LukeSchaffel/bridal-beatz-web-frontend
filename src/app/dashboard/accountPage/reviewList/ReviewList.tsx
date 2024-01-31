import { useEffect, useState } from 'react'
import { Col, List, Progress, Row, Spin, Typography, Rate, Skeleton } from 'antd'

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
		return <Skeleton active />
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
	const averageReview = parseFloat((reviews.reduce((a, b) => a + b.rating, 0) / totalReviews).toFixed(1))

	return (
		<>
			<Row gutter={[32, 16]}>
				<Col>
					<div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
						<Row align="bottom" gutter={[8, 16]}>
							<Col>
								<Typography.Title style={{ margin: 0 }} level={4}>
									{averageReview || 'N/A'}
								</Typography.Title>
							</Col>
							<Col>
								<Typography.Text>Out of 5.0</Typography.Text>
							</Col>
						</Row>
						<Row align="middle">
							<Rate allowHalf value={averageReview} disabled />{' '}
							<Typography.Text>&nbsp; ({averageReview})</Typography.Text>
						</Row>
						<Row>
							<Typography.Title style={{ margin: 0 }} level={5}>
								&nbsp; {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
							</Typography.Title>
						</Row>
					</div>
				</Col>
				<Col flex={1}>
					<div style={{ marginTop: 10, marginBottom: 10 }}>
						{Object.entries(ratings)
							.reverse()
							.map(([rating, amount], i) => {
								const percent = (amount / totalReviews) * 100
								return (
									<Row wrap={false} gutter={[16, 16]} align={'middle'} key={i}>
										<Col>
											<Typography.Text underline>
												{rating} Stars ({amount})
											</Typography.Text>
										</Col>
										<Col flex={1}>
											<Progress percent={percent} format={(p) => p.toFixed(0) + '%'} />
										</Col>
									</Row>
								)
							})}
					</div>
				</Col>
			</Row>
			<List
				loading={status === 'pending'}
				pagination={{ position: 'bottom', align: 'center' }}
				dataSource={reviews}
				renderItem={(item: Review, index) => <Review review={item} />}
				rowKey={(item) => item.review_id.toString()}
			/>
		</>
	)
}

export default ReviewList
