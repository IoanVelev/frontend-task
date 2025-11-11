import * as React from 'react'
import { Box, Button, Card, CardContent, Grid, Snackbar, Typography } from '@mui/joy'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePageData } from '../../context/page-data/page-data.context.ts'
import { BannerDto } from '../../services/dto/banner.dto.ts'
import bannerService from '../../services/banner.service.ts'
import Img from '../../components/Image.tsx'

export default function Banner() {
    const { setPageData } = usePageData()
    const bannerId = useParams()
    const [banner, setBanner] = useState<BannerDto>({ imageUrl: '', link: '' })
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        setPageData({ title: 'Banner details' })
    }, [setPageData])

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const data = await bannerService.getBanner(bannerId.id as string)
                if (data) setBanner(data)
                console.log(data)
            } catch (error) {
                console.error('Failed to fetch banner:', error)
                alert('Something went wrong while fetching the banner')
            }
        }

        if (bannerId) fetchBanner()
    }, [bannerId])

    const handleCopy = async () => {
        if (banner.link) {
            try {
                await navigator.clipboard.writeText(banner.link)
                setOpen(true)
            } catch (error) {
                console.error('Failed to copy link:', error)
            }
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <Card sx={{ width: 500, borderRadius: 'lg', boxShadow: 'md' }}>
                <Img url={banner.imageUrl} />

                <CardContent sx={{ p: 3 }}>
                    <Typography
                        level="title-lg"
                        sx={{ mb: 1 }}
                    >
                        Banner Details
                    </Typography>

                    <Typography
                        level="body-md"
                        sx={{ wordBreak: 'break-all', mb: 2 }}
                    >
                        <strong>Source URL:</strong> {banner.link}
                    </Typography>

                    <Button
                        onClick={handleCopy}
                        variant="solid"
                        color="primary"
                        sx={{ width: 'fit-content' }}
                        startDecorator={<ContentCopyIcon />}
                    >
                        Copy link
                    </Button>
                </CardContent>
            </Card>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                variant="outlined"
                color="success"
                sx={{ mb: 5, mr: 7 }}
            >
                Copied to clipboard!
            </Snackbar>
        </Box>
    )
}
