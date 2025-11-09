import { Box } from '@mui/joy'
import BannerForm from '../../components/banner/BannerForm'
import { Button } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { useEffect } from 'react'
import { BannerDto } from '../../services/dto/banner.dto'

export default function BannerCreate() {
    const { setPageData } = usePageData()

    useEffect(() => {
        setPageData({ title: 'Banner creation page' })
    }, [setPageData])

    const handleCreate = (values: BannerDto) => {
        console.log('Create banner values:', values)
    }
    return (
        <>
            <BannerForm onSubmit={handleCreate} />
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
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
