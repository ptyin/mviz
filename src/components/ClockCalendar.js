import {Heatmap} from "@ant-design/plots";

export default function ({data, style}) {

  const config = {
    data,
    xField: 'time',
    yField: 'week',
    colorField: 'value',
    color: ['#FAFAFA','#F08080'],
    coordinate: {
      type: 'polar',
      cfg: {
        innerRadius: 0.2,
      },
    },
    meta: {
      time: {
        type: 'cat',
      },
    },
    xAxis:{
      label:{
        formatter: (text,item,index) => {
          return text+":00";
        },
      }
    },
    yAxis: {
      top: true,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        style: {
          textAlign: 'center',
        },
      },
    },
    tooltip: {
      title: 'time',
      showMarkers: false,
      formatter: (item)=>{
        let val = item.value;
        val /= 1000; val=parseInt(val);
        let s = val%60;

        val /= 60; val=parseInt(val);
        let m = val%60;

        val /= 60;
        let h = parseInt(val);
        let str = '';
        if(h!==0) {
          str = h+'h';
          str += String(m).padStart(2,'0')+'m';
          str += String(s).padStart(2,'0')+'s';
        }
        else if(m!==0) {
          str = m+'m';
          str += String(s).padStart(2,'0')+'s';
        }
        else {
          str = s+'s';
        }

        return {
          title:item.time+":00~"+(item.time+1)+":00 ("+item.week+")",
          name:"Accumulated duration",
          value:str};
      }
    },
    // interactions: [{type: 'element-active'}],
  };
  return <Heatmap style={style} {...config} />
}