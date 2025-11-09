import { FormControl, FormLabel, Input, Stack } from '@mui/joy'
import { useState } from 'react'
import { BannerDto } from '../../services/dto/banner.dto';

export default function BannerForm({ onSubmit }) {
    const [values, setValues] = useState({imageUrl: '', link: ''});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(values);
    }
    return (
        <form id='banner-form' onSubmit={handleSubmit}>
            <Stack spacing={5}>
                <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                    name='imageUrl'
                    placeholder="Enter image url"
                    value={values.imageUrl}
                    onChange={handleChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Link</FormLabel>
                    <Input 
                    name='link'
                    placeholder="Enter destination link" 
                    value={values.link}
                    onChange={handleChange}
                    />
                </FormControl>
            </Stack>
        </form>
    )
}
