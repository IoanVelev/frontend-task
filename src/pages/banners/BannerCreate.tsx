import { Box } from '@mui/joy'
import BannerForm from '../../components/banner/BannerForm'
import { Button } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { useEffect } from 'react'
import { BannerDto } from '../../services/dto/banner.dto'
import { v4 as uuidv4 } from 'uuid';
import bannerService from '../../services/banner.service'

export default function BannerCreate() {
    const { setPageData } = usePageData()

    useEffect(() => {
        setPageData({ title: 'Banner creation page' })
    }, [setPageData])

    const handleCreate = (values: BannerDto) => {
        const newBanner: BannerDto = {
            id: uuidv4(),
            imageUrl: values.imageUrl,
            link: values.link
        }
        
        bannerService.createBanner(newBanner);
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
        </>
    )
}
