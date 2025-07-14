"use client";

import React, { useState, useEffect } from 'react';

interface BarChartProps {
  data: {
    day: string;
    value: number;
  }[];
  maxValue: number;
  highlightIndex?: number;
  highlightValue?: string;
  highlightDate?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  maxValue, 
  highlightIndex = 4, // Default to Friday (index 4) as shown in the image
  highlightValue = "$1512.67",
  highlightDate = "June 28, 2024"
}) => {
  // y-axis labels exactly as shown in the image - in correct order (bottom to top)
  const yAxisLabels = ['0', '5k', '15k', '25k', '35k'];
  
  // State for active tooltip
  const [activeTooltip, setActiveTooltip] = useState<number | null>(highlightIndex);
  
  // Calculate bar heights based on data and maxValue
  const barHeights = data.map(item => {
    // Ensure we're calculating the height correctly based on the max value
    // Use a lower percentage to match the design (bars shouldn't be too tall)
    const heightPercentage = Math.max((item.value / maxValue) * 65, 2); // Adjusted to match design
    return {
      day: item.day,
      height: `${heightPercentage}%`,
      value: item.value
    };
  });

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col h-full">
        {/* Main chart area with y-axis labels and bars */}
        <div className="flex flex-grow pb-1"> {/* Reduced padding to bring dates closer to chart */}
          {/* Y-axis labels - in correct order (bottom to top) */}
          <div className="flex flex-col justify-between pr-4 text-xs text-gray-500">
            {[...yAxisLabels].reverse().map((label, index) => (
              <div key={index}>{label}</div>
            ))}
          </div>
          
          {/* Chart bars */}
          <div className="flex items-end justify-between flex-grow relative">
            {barHeights.map((bar, index) => {
              const isHighlighted = index === highlightIndex;
              
              return (
                <div 
                  key={bar.day} 
                  className="flex flex-col items-center flex-1 relative h-full"
                  onMouseEnter={() => setActiveTooltip(index)}
                  onMouseLeave={() => setActiveTooltip(highlightIndex)}
                >
                  <div className="flex flex-col justify-end h-full w-full items-center">
                    <div 
                      className={`rounded-lg ${isHighlighted ? 'bg-[#7C3AED]' : 'bg-gray-200/70'}`}
                      style={{ 
                        height: bar.height, 
                        minHeight: '4px', 
                        width: '80%',
                        maxWidth: '45px' /* Adjusted width to match design */
                      }}
                      data-value={bar.value}
                    />
                  </div>
                  
                  {/* Tooltip - always show for highlighted bar by default */}
                  {(activeTooltip === index || (index === highlightIndex && activeTooltip === null)) && (
                    <div 
                      className="absolute bg-white shadow-md rounded-lg p-2.5 z-10 w-36 text-center transform -translate-x-1/2 left-1/2"
                      style={{ bottom: 'calc(100% - 1px)' }} // Position tooltip directly touching the bar as in screenshot
                    >
                      <div className="text-xs text-gray-500">{index === highlightIndex ? highlightDate : `${bar.day}`}</div>
                      <div className="text-base font-semibold text-black">{index === highlightIndex ? highlightValue : `$${bar.value.toLocaleString()}`}</div>
                      {/* Triangle pointer */}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 shadow-b"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* X-axis labels (days) - aligned with the bars */}
        <div className="flex"> {/* Removed margin to reduce spacing */}
          <div className="pr-4 w-8"></div> {/* Spacer to align with y-axis labels */}
          <div className="flex justify-between flex-grow px-2">
            {data.map((item, index) => (
              <div key={index} className="flex-1 text-center text-xs text-gray-500">{item.day}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
