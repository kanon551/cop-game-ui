import React, { useEffect, useState } from 'react'
import { Cop, StandardAPIResponse, obtainAllCops, saveCopsData } from '../global/GlobalAPI'
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import Masonry from '@mui/lab/Masonry';
import Container from '@mui/material/Container';
import chase from '../assets/racing.jpg';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const ChooseCops = () => {

    const [copsData, setCopsData] = useState<StandardAPIResponse>();
    const navigate = useNavigate();
    const [checked, setChecked] = useState<{ [key: number]: boolean }>({});
    const [selectedCops, setSelectedCops] = useState<Cop[]>([]);
    const [enableButton, setEnableButton] = useState<boolean>(false);

    useEffect(() => {
        getCopsData();
    }, [])

    const getCopsData = async () => {
        const data = await obtainAllCops();
        if (data.status === false) {
            console.log(`${data.statusMessage}`)
        }
        else {
            setCopsData(data);
        }
    }

    useEffect(() => {
        if (selectedCops.length === 3) {
            setEnableButton(true)
        }
        else {
            setEnableButton(false);
        }
    }, [selectedCops])

    const favoriteClicked = async (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const numberOfSelectedCops = Object.values(checked).filter(Boolean).length;

        if (numberOfSelectedCops === 3 && !checked[id]) {
            // Display notification that only 3 cops are allowed
            alert('Only 3 cops are allowed');
            setEnableButton(true)
        } else {

            console.log(id)
            setChecked((prev) => ({
                ...prev,
                [id]: !prev[id],
            }));

            setEnableButton(false)

            if (!checked[id]) {
                const selectedCop = copsData?.response?.find((cop: Cop) => cop.id === id);
                setSelectedCops((prevSelectedCops) => [...prevSelectedCops, selectedCop]);
                // console.log('Selected Cop:', selectedCop);
            }
            else {
                // If the cop is already selected, remove it from the array
                setSelectedCops((prevSelectedCops) =>
                    prevSelectedCops.filter((cop) => cop.id !== id)
                );
            }

        }
    };

    const saveCops = async () => {
        const saveData = await saveCopsData(selectedCops);
        if (saveData.status === false) {
            alert(`${saveData.statusMessage}`);
        }
        else {
            console.log(saveData.response)
            navigate('/selectCity')
        }
    }


    return (
        <Container>
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: '1vh', height: '100%',
                backgroundImage: `url(${chase})`
            }}>

                <h2 style={{ color: 'white' }}>Select 3 cops to deploy</h2>
                <Button variant="contained" color="primary" onClick={saveCops}
                    sx={{ marginBottom: '2vh' }} disabled={!enableButton}>
                    Continue
                </Button>
                <Masonry columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }} spacing={2}>
                    {
                        copsData !== null && copsData !== undefined && copsData.status === true && copsData.response?.length > 0 &&
                        copsData.response.map((obj: Cop, index: number) => (
                            <Grow
                                key={index}
                                in={true}
                                style={{ transformOrigin: '0 0 0' }}
                                {...({ timeout: index * 1000 })}
                            >
                                <Card variant="outlined">
                                    <CardOverflow sx={{ padding: '0px !important' }}>
                                        <img
                                            src={`${obj.image}`}
                                            srcSet={`${obj.image}`}
                                            loading="lazy"
                                            alt={"XYZ"}
                                            style={{
                                                borderRadius: 10,
                                                display: 'block',
                                                width: '100%',
                                                height: '100%',
                                                padding: '2px 4px',
                                                background: 'azure',
                                                boxShadow: 'rgba(0, 0, 0, 0.5) -10px 10px 5px -3px'
                                            }}
                                        />
                                        <Checkbox {...label} sx={{
                                            position: 'absolute',
                                            zIndex: 2,
                                            background: 'palegreen',
                                            borderRadius: '50%',
                                            right: '1rem',
                                            bottom: 0,
                                            transform: 'translateY(50%)',
                                            "&:hover": {
                                                background: 'palegreen !important',
                                            },
                                        }}
                                            color="error"
                                            checked={checked[obj.id] || false}
                                            icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={(event: React.ChangeEvent<HTMLInputElement>) => favoriteClicked(obj.id, event)} />
                                    </CardOverflow>
                                    <CardContent>
                                        <Typography level="h2" fontSize="md">
                                            <Link href="#multiple-actions" overlay underline="none">
                                                {
                                                    obj.name
                                                }
                                            </Link>
                                        </Typography>
                                        <Typography level="body-xs" sx={{ mt: 0.5 }}>
                                            <Link href="#multiple-actions" overlay underline="none">
                                                {
                                                    obj.copID
                                                }
                                            </Link>
                                        </Typography>
                                    </CardContent>
                                    <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                                        <Divider inset="context" />
                                        <CardContent orientation="horizontal">
                                            <Typography
                                                level="body-xs"
                                                sx={{ fontWeight: 'md', color: 'text.secondary' }}
                                            >
                                                Country
                                            </Typography>
                                            <Divider orientation="vertical" />
                                            <Typography
                                                level="body-xs"
                                                sx={{ fontWeight: 'md', color: 'text.secondary' }}
                                            >
                                                {
                                                    obj.country
                                                }
                                            </Typography>
                                        </CardContent>
                                    </CardOverflow>
                                </Card>
                            </Grow>
                        ))}
                </Masonry>


            </Box>

        </Container>
    )
}

export default ChooseCops
