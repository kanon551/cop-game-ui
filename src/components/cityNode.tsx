import React from 'react'
import styled from 'styled-components';
import { Handle,  Position } from 'reactflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';


interface CityNodeProps {
    data: {
      cityName: string;
      cityTitle: string;
      cityDescription: string;
      cityImage: string;
    };
  }


const cityNode = ({ data }: CityNodeProps) => {



    return (
        <Card sx={{ width: 320 }}>
            <Handle type="target" position={Position.Top} isConnectable={true} 
        style={{ backgroundColor: '#1a192b', width:'10px', height:'10px' }} />
      <div>
        <Typography level="title-lg">{data.cityName}</Typography>
        <Typography level="body-sm">{data.cityTitle}</Typography>

      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={data.cityImage}
          srcSet={data.cityImage}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography fontSize="lg" fontWeight="lg">
          {data.cityDescription}
          </Typography>
        </div>
      </CardContent>
    </Card>
      )
}

export default cityNode
