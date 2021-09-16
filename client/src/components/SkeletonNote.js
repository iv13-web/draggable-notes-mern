import {Card, CardActions, CardHeader, Divider, Grid} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

export default function SkeletonNote({count}) {

	const skeletonNote = (key) => (
		<Grid item xs={12} md={6} lg={4} xl={3} key={key || 'skeletonNoteKey'}>
			<Card elevation={3} style={{height: 123}}>
				<CardHeader
					title={<Skeleton animation="wave" width='80%'/>}
					subheader={<Skeleton animation="wave" width='60%'/>}
					avatar={<Skeleton animation="wave" variant="circle" width={40} height={40}/>}
				/>
				<Divider/>
				<CardActions>
					<Skeleton animation="wave" width='10%' style={{marginTop: 8}}/>
					<Skeleton animation="wave" width='10%' style={{marginTop: 8}}/>
				</CardActions>
			</Card>
		</Grid>
	)

  return count
		? Array(count).fill('').map((_, i) =>  skeletonNote(i))
		: skeletonNote()
}