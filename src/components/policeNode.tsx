import React from 'react'
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import AspectRatio from '@mui/joy/AspectRatio';
import { Handle,  Position } from 'reactflow';

interface PoliceNodeProps {
    data: {
      image: string;
      name: string;
      copID: string;
      country: string;
    };
  }


const policeNode = ({data}: PoliceNodeProps) => {
    return (
        <Card variant="outlined" sx={{ width: 320}}>
         <AspectRatio minHeight="220px" >
         {/* <CardOverflow sx={{ padding: '0px !important' }}> */}
            <img
            src={`${data.image}`}
            srcSet={`${data.image}`}
            loading="lazy"
            alt={"XYZ"}
            style={{
                borderRadius: 10,
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',  // This property ensures the image covers the entire container while maintaining its aspect ratio
                objectPosition: 'center center',  
                padding: '2px 4px',
                background: 'azure',
                boxShadow: 'rgba(0, 0, 0, 0.5) -10px 10px 5px -3px',
            }}
            
            />
            {/* </CardOverflow> */}
        </AspectRatio>
        <CardContent>
            <Typography level="h2" fontSize="md">
                <Link overlay underline="none">
                    {
                        data.name
                    }
                </Link>
            </Typography>
            <Typography level="body-xs" sx={{ mt: 0.5 }}>
                <Link overlay underline="none">
                    {
                        data.copID
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
                        data.country
                    }
                </Typography>
            </CardContent>
        </CardOverflow>
        <Handle type="source" position={Position.Bottom} isConnectable={true} 
        style={{ backgroundColor: '#1a192b', width:'10px', height:'10px' }} />
    </Card>
      )
}

export default policeNode
