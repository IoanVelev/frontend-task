import { FormControl, FormLabel, Input, Stack } from '@mui/joy'

export default function BannerForm() {
    return (
        <form>
            <Stack spacing={5}>
                <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input placeholder="Enter image url" />
                </FormControl>

                <FormControl>
                    <FormLabel>Link</FormLabel>
                    <Input placeholder="Enter destination link" />
                </FormControl>
            </Stack>
        </form>
    )
}
