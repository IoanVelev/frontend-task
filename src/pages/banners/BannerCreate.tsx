import { Box } from '@mui/joy'
import BannerForm from '../../components/banner/BannerForm'
import { Button } from '@mui/joy'
import { usePageData } from '../../context/page-data/page-data.context'
import { useEffect } from 'react'

export default function BannerCreate() {
    const { setPageData } = usePageData()

    useEffect(() => {
        setPageData({title: 'Banner creation page'})
    }, [setPageData])
    return (
        <>
            <BannerForm></BannerForm>
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                <Button
                    type="submit"
                    variant='solid'
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
