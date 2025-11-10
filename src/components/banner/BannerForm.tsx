import { FormControl, FormLabel, Input, Stack } from '@mui/joy'
import { useState } from 'react'
import { BannerDto } from '../../services/dto/banner.dto';
import { FormHelperText } from '@mui/joy';

export default function BannerForm({ onSubmit }) {
    const [values, setValues] = useState({imageUrl: '', link: ''});
    const [errors, setErrors] = useState({imageUrl: '', link: ''});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = { imageUrl: '', link: ''};
        let hasErrors = false;

        const urlPattern = /^https?:\/\/.+/;

        if(!urlPattern.test(values.imageUrl)) {
            newErrors.imageUrl = 'Enter a valid URL starting with http:// or https://';
            hasErrors = true;
        }

        if(!urlPattern.test(values.link)) {
            newErrors.link = 'Enter a valid URL starting with http:// or https://';
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            onSubmit(values);
            setValues({ imageUrl: '', link: '' });
            setErrors({ imageUrl: '', link: '' });
        }
        
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
                    required
                    />
                    {errors.imageUrl && <FormHelperText sx={{ color: 'red' }}>{errors.imageUrl}</FormHelperText>}
                </FormControl>

                <FormControl>
                    <FormLabel>Link</FormLabel>
                    <Input 
                    name='link'
                    placeholder="Enter destination link" 
                    value={values.link}
                    onChange={handleChange}
                    required
                    />
                    {errors.link && <FormHelperText sx={{ color: 'red' }}>{errors.link}</FormHelperText>}
                </FormControl>
            </Stack>
        </form>
    )
}
