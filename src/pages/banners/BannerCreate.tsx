import * as React from 'react'
import { Box, Snackbar } from '@mui/joy'
import BannerForm from '../../components/banner/BannerForm'
import { Button } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { useEffect } from 'react'
import { BannerDto } from '../../services/dto/banner.dto'
import { v4 as uuidv4 } from 'uuid'
import bannerService from '../../services/banner.service'
import { useNavigate } from 'react-router-dom'

export default function BannerCreate() {
    const { setPageData } = usePageData()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        setPageData({ title: 'Banner creation page' })
    }, [setPageData])

    const handleCreate = async (values: BannerDto) => {
        const newBanner: BannerDto = {
            id: uuidv4(),
            imageUrl: values.imageUrl,
            link: values.link,
        }

        try {
            await bannerService.createBanner(newBanner)
            setOpen(true)

            setTimeout(() => {
                navigate('/banners')
            }, 1000)
        } catch (error) {
            console.error('Failed to create banner.', error)
            alert('Something went wrong while creating the banner.')
        }
    }
    return (
        <>
            <BannerForm onSubmit={handleCreate} />
            <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
                <Button
                    form="banner-form"
                    type="submit"
                    variant="solid"
                    sx={{
                        width: 'fit-content',
                        px: 3,
                    }}
                >
                    Create banner
                </Button>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                variant="outlined"
                color="success"
                sx={{ mb: 5, mr: 7 }}
            >
                Banner successfuly created!
            </Snackbar>
        </>
    )
}
