import  { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, Controls } from 'reactflow';
// import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, Controls } from 'react-flow-renderer';

const elements = [
    { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    // Vous pouvez ajouter plus de nœuds et les connecter avec des edges
];

const styles = {
    background: 'red',
    width: '100%',
    height: 300,
};
const Flow = () => {


    return (
      <ReactFlow style={styles}
                 nodes={elements} />
    );
};

export default Flow;