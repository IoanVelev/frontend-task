import { Box } from '@mui/joy'
import BannerForm from '../../components/banner/BannerForm'
import { Button } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { useEffect, useState } from 'react'
import { BannerDto } from '../../services/dto/banner.dto'
import bannerService from '../../services/banner.service'
import { useNavigate, useParams } from 'react-router-dom'

export default function BannerEdit() {
    const { setPageData } = usePageData()
    const navigate = useNavigate()
    const bannerId = useParams()
    const [banner, setBanner] = useState<BannerDto>({ imageUrl: '', link: ''})

    useEffect(() => {
        setPageData({ title: 'Banner edit page' })
    }, [setPageData])

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const data = await bannerService.getBanner(bannerId.id as string)
                if (data) setBanner(data)
            }
            catch (err) {
                console.error('Failed to fetch banner.', err)
                alert('Something went wrong while fetching banner data')
            }
        }

        if (bannerId) fetchBanner()
    }, [bannerId])

    const handleEdit = async (values: BannerDto) => {
        if (!bannerId) return

        try {
            await bannerService.updateBanner(bannerId.id as string, values)
            navigate('/banners')
        }
        catch (err) {
            console.error('Failed to edit banner', err)
            alert('Something went wrong while updating the banner')
        }
    }
    return (
        <>
            <BannerForm onSubmit={handleEdit} initialValues={banner} />
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
                    Edit banner
                </Button>
            </Box>
        </>
    )
}