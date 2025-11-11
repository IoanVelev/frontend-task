import { BannerDto } from '../../services/dto/banner.dto.ts'
import { Button, Card, CardActions, CardOverflow, Grid, Skeleton, Typography } from '@mui/joy'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import { Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Image from '../Image.tsx'
import bannerService from '../../services/banner.service.ts'

export default function BannerCard(props: { banner?: BannerDto; delete?: () => void }) {
    const navigate = useNavigate()
    const url = props.banner?.link

    const getDomainFromUrl = () => {
        const match = url?.match(/^https?:\/\/(?:www\.)?([^/]+)/i)
        return match ? match[1] : url
    }

    const onDelete = () => {
        bannerService.deleteBanner(props.banner!.id!)
        navigate('/banners')
    }

    return (
        <Grid
            xl={3}
            lg={4}
            md={6}
            sm={6}
            xs={12}
        >
            <Card sx={{ height: 400, width: '300px' }}>
                <CardOverflow>
                    <Image url={props.banner?.imageUrl} />
                </CardOverflow>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            level="title-lg"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                            }}
                        >
                            <Skeleton
                                loading={!props.banner}
                                variant="text"
                                sx={{ width: '100%', height: '100%' }}
                            >
                                {getDomainFromUrl()}
                            </Skeleton>
                        </Typography>
                    </Box>
                </Box>
                <CardActions>
                    <Button
                        variant="solid"
                        type={'button'}
                        size="md"
                        onClick={() => navigate({ pathname: `/banners/${props.banner!.id}` })}
                        color="primary"
                        sx={{ width: '75%', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Details
                    </Button>
                    <IconButton
                        variant="outlined"
                        size="sm"
                        sx={{ width: '20%', alignSelf: 'center' }}
                        onClick={() => onDelete()}
                    >
                        <Delete />
                    </IconButton>
                    <Button
                        variant="solid"
                        type={'button'}
                        size="md"
                        onClick={() => navigate({ pathname: `/banners/${props.banner!.id}/edit` })}
                        color="primary"
                        sx={{ width: '75%', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Edit
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
