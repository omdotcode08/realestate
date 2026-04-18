import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  change = null,
  icon: Icon,
  numericValue = null // If passed, we animate from 0 to this value
}) {
  const [displayValue, setDisplayValue] = useState(numericValue ? 0 : value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!numericValue || !isInView) return;

    let startTimestamp = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setDisplayValue(Math.floor(easeProgress * numericValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(numericValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [numericValue, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="glass p-6 rounded-2xl flex flex-col hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-slate-500 font-medium">{title}</h4>
        {Icon && (
          <div className="p-2 bg-gold-100 rounded-lg text-gold-600">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-navy-900 block">
            {numericValue ? `${prefix}${displayValue.toLocaleString()}${suffix}` : value}
          </span>
          {change !== null && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">{Math.abs(change)}%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
