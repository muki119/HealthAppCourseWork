import React,{useState,useCallback,useMemo} from "react";
import { BarChart } from '@mui/x-charts';
import { Typography } from "@mui/material";

const BarChartTile = ({metricType, metrics}) => {

        const getThisWeekMonday = (date)=>{
        const newDate = new Date(date);
        var dateDayOfWeek = newDate.getDay();
        const daysFromMonday = dateDayOfWeek ? (dateDayOfWeek - 1) : 6;
        newDate.setDate(newDate.getDate() - daysFromMonday);
        newDate.setHours(0,0,0)
        return newDate;
    }

    const getBarChartData = useCallback(()=> {
        if (!metrics){
            return []
        }
        const chartTypeData = metrics.filter((metric) => metric.metric_type === metricType)
        const chartTypeThisWeek = chartTypeData.filter((metric) => {
            const todayDate = new Date()
            const metricDate = new Date(metric.date_created)
            const weekStartDate = getThisWeekMonday(todayDate)
            return weekStartDate <= metricDate && metricDate <= todayDate
        })

        //group by date
        //sort by date
        chartTypeThisWeek.sort((a, b) => new Date(a.date_created) - new Date(b.date_created));
        const chartTypeByDate = chartTypeThisWeek.reduce((acc, metric) => {
            const metricDate = new Date(metric.date_created).toISOString().split("T")[0];
            if (!acc[metricDate]) {
                acc[metricDate] = 0;
            }
            acc[metricDate] += metric.metric_value;
            return acc;
        }, {})

        // convert to array
        const chartTypeArray = Object.entries(chartTypeByDate).map(([date, value]) => {
            return {
                date: new Date(date).toLocaleDateString("en-GB", { month: 'short', day: 'numeric' }),
                value: value
            }
        })
        return chartTypeArray

    },[metrics, metricType])

    return(
        <>
        {metrics?
            <BarChart dataset={getBarChartData()}
             xAxis={[{dataKey: 'date'}]} 
             series={[{dataKey: 'value', color: '#8abbf6'}]} 
             height={300}/>
        :<Typography>No data available</Typography>}
        </>
    )
}

export default BarChartTile;