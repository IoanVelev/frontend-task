import { Box } from '@mui/joy'
import BannerForm from '../../components/banner/BannerForm'
import { Button } from '@mui/joy'

export default function BannerCreate() {
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
