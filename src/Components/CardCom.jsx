import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CardInfo from './CardInfo';
import { CAR_IMAGE_RESOURCE } from '../services/carService';

export default function CardCom({car}) {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCardClick = () => {
        // Pass car details to the /rent page
        navigate('/rent2', {
            state: {
                car: {
                    name: 'BMW',
                    mileage: '1200',
                    fuelType: 'Petrol',
                    seatCapacity: '4',
                    fuelCapacity: '100',
                    fuelUnit: 'L',
                    rentPrice: '2000.00',
                    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10655/1744284802118/front-left-side-47.jpg',
                },
            },
        });
    };

    return (
        <Card
            sx={{
                width: 350,
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.02)',
                },
            }}
        >
            <CardActionArea onClick={handleCardClick}> {/* Add onClick handler */}
                <CardMedia
                    component="img"
                    height="160"
                    image={CAR_IMAGE_RESOURCE + car.modelImage}
                    alt="Car Image"
                />
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        textAlign: 'center',
                        py: 2,
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {car.modelName}
                    </Typography>

                    {/* Car Info Icons */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                        <CardInfo car={car} />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}