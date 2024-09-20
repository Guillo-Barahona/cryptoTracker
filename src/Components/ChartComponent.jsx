import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const ChartComponent = ({ data }) => {
return (
    <ResponsiveContainer width="100%" height={400}>
    <LineChart
        data={data}
        margin={{
        top: 10, right: 30, left: 0, bottom: 0,
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart>
    </ResponsiveContainer>
);
};

export default ChartComponent;