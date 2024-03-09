import React, { useEffect, useRef, useState, useCallback } from 'react'
import Box from '@mui/material/Box';
import chase from '../assets/racing.jpg';
import { Cop, CustomNode, StandardAPIResponse, cityData, getSelectedCops, policeData, selectCities } from '../global/GlobalAPI';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  OnConnect,
  ReactFlowProvider,
  EdgeMarker,
  MarkerType,
} from 'reactflow';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import 'reactflow/dist/style.css';
import CityNode from '../components/cityNode';
import PoliceNode from '../components/policeNode';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const DnDFlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: -webkit-fill-available;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const ReactFlowWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
`;

const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

const customArrowMarker: EdgeMarker = {
  type: MarkerType.ArrowClosed,
  color: '#ff0000',
  width: 25,
  height: 25,
  markerUnits: 'strokeWidth',
  orient: 'auto',
  strokeWidth: 2,
};

const initialNodes: CustomNode[] = [
  {
    id: '1',
    data: {
      cityName: 'Yapkashnagar',
      cityTitle: "the Neon Oasis",
      cityDescription: "Glowing alleys and rooftop races, powered by solar energy",
      cityImage: 'https://img.freepik.com/premium-photo/solar-panels-installed-city-rooftop-sustainable-energy-production-generative-ai_662353-1290.jpg'
    },
    position: { x: 0, y: 0 },
    type: 'cityNode',
    draggable: false
  },
  {
    id: '2',
    data: {
      cityName: 'Lihaspur',
      cityTitle: " the Misty Labyrinth",
      cityDescription: "Ancient temples shrouded in fog, whispers of forgotten tech.",
      cityImage: 'https://pbs.twimg.com/media/FZDwD6WaAAImEqo.jpg:large'
    },
    position: { x: 450, y: 0 },
    type: 'cityNode',
    draggable: false
  },
  {
    id: '3',
    data: {
      cityName: 'Narmis City',
      cityTitle: "the Steel Jungle",
      cityDescription: "Towering skyscrapers and hidden underground networks.",
      cityImage: 'https://www.designboom.com/twitterimages/uploads/2022/08/ai-futuristic-sustainable-city-air-purifying-biophilic-skyscrapers-manas-bhatia-designboom-1200.jpg'
    },
    position: { x: 900, y: 0 },
    type: 'cityNode',
    draggable: false
  },
  {
    id: '4',
    data: {
      cityName: 'Shekharvati',
      cityTitle: " the Sun-Kissed Valley",
      cityDescription: "Rolling hills and forgotten mining tunnels. ",
      cityImage: 'https://img.freepik.com/premium-photo/large-scale-mining-operation-representing-mining-natural-resources-industries_629685-1553.jpg'
    },
    position: { x: 1350, y: 0 },
    type: 'cityNode',
    draggable: false
  },
  {
    id: '5',
    data: {
      cityName: 'Nuravgram',
      cityTitle: "the Quirky Village",
      cityDescription: "Talking robots and malfunctioning AI guardians.",
      cityImage: 'https://miro.medium.com/v2/resize:fit:1400/1*H5KOydM6wTP2FqCPBj96pA.png'
    },
    position: { x: 1800, y: 0 },
    type: 'cityNode',
    draggable: false
  },

];

const nodeTypes = { cityNode: CityNode, policeNode: PoliceNode };

const ChooseCity = () => {

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [selectedCitiesWithCopId, setSelectedCitiesWithCopId] = useState<StandardAPIResponse>();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [enableButton, setEnableButton] = useState<boolean>(false);


  useEffect(() => {
    getSelectedCopsData();
  }, [])

  useEffect(() => {


    if (edges.length === 3) {
      renderButtonConditionally();
    }
    else {
      setEnableButton(false);
    }

  }, [selectedCitiesWithCopId, edges])

  const onConnect: OnConnect = useCallback(
    async (params) => {

      const { source, target } = params;



      const existingOutgoingEdges = edges.filter((edge) => edge.source === source);

      if (existingOutgoingEdges.length > 0) {

        alert('Each Cop can only be assigned to one city.');
        return;
      }


      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);

      if (sourceNode && targetNode) {

        const data = {
          copId: '',
          selectedCity: ''
        }
        if ('copID' in sourceNode.data) {

          const sourceCopID = (sourceNode.data as policeData).copID;
          data.copId = sourceCopID;
        }

        if ('cityName' in targetNode.data) {

          const targetCityName = (targetNode.data as cityData).cityName;
          data.selectedCity = targetCityName;
        }

        const citisData = await selectCities(data);
        setSelectedCitiesWithCopId(citisData)

        if (citisData.status === false) {
          alert(citisData.statusMessage)
        }
        else {
          setEdges((eds) => addEdge({ ...params, animated: true, type: 'default', markerEnd: customArrowMarker }, eds));
        }
      } else {
        alert('Source or Target Node not found.');
      }
    },
    [setEdges, nodes, edges]
  );

  const renderButtonConditionally = () => {
    if (selectedCitiesWithCopId !== undefined &&
      selectedCitiesWithCopId !== null && Object.keys(selectedCitiesWithCopId.response).length === 3
    ) {
      // console.log(selectedCitiesWithCopId)
      setEnableButton(true)
    }
    else {
      setEnableButton(false);
    }
  }

  const getSelectedCopsData = async () => {
    const selectedCopsResponse = await getSelectedCops();
    if (selectedCopsResponse.status === false) {
      alert(`${selectedCopsResponse.statusMessage}`);
    }
    else {


      const middleX = (initialNodes[0].position.x + initialNodes[initialNodes.length - 1].position.x) / 2;


      const horizontalDistance = 450;


      const policeNodes = selectedCopsResponse.response.map((police: Cop, index: number) => ({
        id: `police_${police.id}`,
        data: {
          image: police.image,
          name: police.name,
          copID: police.copID,
          country: police.country,
        },

        position: { x: middleX + (index - 1) * horizontalDistance, y: -500 },
        type: 'policeNode',
        draggable: false
      }));


      setNodes((prevNodes) => {
        const existingNodeIds = new Set(prevNodes.map((node) => node.id));
        const uniquePoliceNodes = policeNodes.filter((policeNode: CustomNode) => !existingNodeIds.has(policeNode.id));
        return [...prevNodes, ...uniquePoliceNodes];
      });

    }
  }

  const saveCities = () => {
    navigate("/selectVehicle", {
      state: { payload: selectedCitiesWithCopId },
    });
  }


  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: '1vh', height: '100vh',
      backgroundImage: `url(${chase})`
    }}>
      <h2 style={{ color: 'white' }}>Select Cities for each COP</h2>
      <Button variant="contained" color="primary" onClick={saveCities}
        sx={{ marginBottom: '2vh' }} disabled={!enableButton}>
        Proceed
      </Button>
      <DnDFlowContainer>
        <ReactFlowProvider>
          <Grid item xs={12} spacing={3} sx={{ padding: '2vh', marginTop: '2vh', width: '-webkit-fill-available' }}>
            <div style={{ width: 'auto', height: '550px', background: 'azure', borderRadius: '12px' }}>
              <ReactFlowWrapper ref={reactFlowWrapper}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  defaultViewport={defaultViewport}
                  minZoom={0.2}
                  maxZoom={1}
                  fitView
                >
                  <Controls />
                  {/* <MiniMap /> */}
                  <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
              </ReactFlowWrapper>
            </div>


          </Grid>
        </ReactFlowProvider>
      </DnDFlowContainer>
    </Box>
  )
}

export default ChooseCity
