import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import chase from '../assets/racing.jpg';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import styled from 'styled-components';
import Divider from '@mui/joy/Divider';
import { CityWithVehicleOptions, ElectricVehicle, Payload, StandardAPIResponse, getAllEligibleVehiclesList, getAllVehicles, updateInventoryPayload, updatedInventory } from '../global/GlobalAPI';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Badge from '@mui/joy/Badge';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Avatar from '@mui/joy/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Item = styled(Sheet)`

    text-align: center;
    font-weight: 200;
    color: black;
    border: 1px solid black;
    border-color: black;
    padding: 1vh;
    margin: 1vh;
    border-radius: 4px;
    flex-grow: 1;
    height: fit-content;

`;


const ChooseVehicle = () => {
    const location = useLocation();

    const [vehicleList, setVehicleList] = React.useState<StandardAPIResponse>();
    const [eligibleVehicleList, setEligibleVehicleList] = React.useState<StandardAPIResponse>();

    const [vehicle, setVehicle] = React.useState<Array<{ copId: string; vehicleKind: string }>>([]);

    useEffect(() => {
        getVehicleList();
    },[])

    useEffect(() => {
        if (eligibleVehicleList?.response) {
          const initialVehicles = eligibleVehicleList.response.map((data: CityWithVehicleOptions) => ({
            copId: data.copId || '',
            vehicleKind: '', // Set initially as an empty string
          }));
          setVehicle(initialVehicles);
        }
      }, [eligibleVehicleList]);
      
    useEffect(() => {
        if (location.state && location.state.payload) {
            // console.log(location.state.payload);
            getCopVehicleList(location.state.payload.response);
        }
    }, [location])

    // useEffect(() => {
    //     console.log(vehicle);
    // },[vehicle])

    const getVehicleList = async () => {
        const data = await getAllVehicles();
        if(data.status === false) {
            console.log(data.statusMessage);
        }
        else{
            setVehicleList(data);
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        const index = name ? parseInt(name) : 0;
      
        setVehicle((prevVehicle) => {
          const updatedVehicle = [...prevVehicle];
          updatedVehicle[index] = { copId: eligibleVehicleList?.response?.[index].copId || '', vehicleKind: value as string };
          return updatedVehicle;
        });

        // const vehicleRelations = eligibleVehicleList?.response?.[index];
        // console.log(vehicleRelations);
        let payload =  { 
            copId: eligibleVehicleList?.response?.[index].copId || '', 
            vehicleKind: value as string, 
            copVehicleRelations: eligibleVehicleList?.response
        }

        getlatestInventory(payload);
        
        // console.log(payload);
      };

      const getlatestInventory = async(payload: updateInventoryPayload)=> {
        const data = await updatedInventory(payload);
        if(data.status === false) {
            console.log(data.statusMessage);
        }
        else{
            setVehicleList(data)
            getCopVehicleList(location.state.payload.response)
            // console.log(data);
        }
      }

    const getCopVehicleList = async(payload: Payload) => {
        const data = await getAllEligibleVehiclesList(payload);   
        if(data.status === false) {
            console.log(data.statusMessage);
        }
        else{
            setEligibleVehicleList(data);
        } 
    }

    return (
        // <Container>
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: '1vh', height: '100%',
                backgroundImage: `url(${chase})`
            }}>

                <h2 style={{ color: 'white' }}>Select your vehicle from Inventory</h2>

                <Box>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    flexWrap="wrap" 
                    useFlexGap
                    divider={<Divider orientation="vertical" />}
                    justifyContent="center"
                >
                    {
                        vehicleList !==undefined && vehicleList !== null && vehicleList.response?.map((vehicle:ElectricVehicle, index: number) => (
                            <Item key={index}>
                                <Badge badgeContent={vehicle.count}>
                                <Card sx={{ width: 260 }}>
                                    <div>
                                        <Typography level="title-lg">{vehicle.kind}</Typography>

                                    </div>
                                    <AspectRatio minHeight="120px" maxHeight="200px">
                                        <img
                                        src={vehicle.image}
                                        srcSet={vehicle.image}
                                        loading="lazy"
                                        alt=""
                                        />
                                    </AspectRatio>
                                    <CardContent orientation="horizontal">
                                        <div>
                                        <Typography fontSize="lg" fontWeight="lg">
                                            {`Range : ${vehicle.range} km`}
                                        </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                                </Badge>
                                </Item>
                        ))
                    }
                </Stack>

                   
                            <List
                            variant="outlined"
                            sx={{
                                minWidth: 240,
                                borderRadius: 'sm',
                                backgroundColor:'bisque',
                                marginTop:'3vh', 
                                marginBottom:'3vh'
                            }}
                            >
                             {
                        eligibleVehicleList !==undefined && eligibleVehicleList !== null && eligibleVehicleList.response?.map((data:CityWithVehicleOptions, index: number) => (

                            <div key={index}>
                                 <ListItem sx={{display: 'flex', alignItems: 'center',justifyContent: 'space-between'}}>
                                    <ListItemDecorator>
                                        <Avatar size="lg" src={data.copImage} />
                                    </ListItemDecorator>
                                    {data.city}
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                        <InputLabel id={`vehicle-label-${index}`}>Vehicle</InputLabel>
                                            <Select
                                            labelId={`vehicle-label-${index}`}
                                            id={`vehicle-select-${index}`}
                                            value={vehicle[index]?.vehicleKind || ''}
                                            name={index.toString()}
                                            label="Vehicle"
                                            onChange={handleChange}
                                            >
                                                {
                                                    data.vehicleOptions.map((vehicle:ElectricVehicle, index: number) => (
                                                        <MenuItem key={index} value={vehicle.kind}>{vehicle.kind}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </ListItem>
                                <ListDivider inset="startContent" />
                            </div>
                           
                            ))
                        }
                            </List>
                       
                  
                </Box>

            </Box>

        // </Containe/r>
    )
}

export default ChooseVehicle
