"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedSvg.module.scss";

interface AnimatedSvgProps {
  src: string;
  alt: string;
  className?: string;
}

export const AnimatedSvg = ({ src, alt, className = "" }: AnimatedSvgProps) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (svgContainerRef.current) {
      const rect = svgContainerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    // Load the SVG
    const loadSvg = async () => {
      try {
        const response = await fetch(src);
        const svgText = await response.text();
        
        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText;
          
          // Apply styles to the SVG for transparency
          const svgElement = svgContainerRef.current.querySelector('svg');
          if (svgElement) {
            (svgElement as SVGElement).style.maxWidth = "100%";
            (svgElement as SVGElement).style.height = "auto";
            (svgElement as SVGElement).style.background = "transparent";
            
            // Remove any background rectangles that might exist in the SVG
            const rects = svgElement.querySelectorAll('rect');
            rects.forEach(rect => {
              const width = rect.getAttribute('width');
              const height = rect.getAttribute('height');
              const x = rect.getAttribute('x') || '0';
              const y = rect.getAttribute('y') || '0';
              
              // Check if this might be a background rectangle
              if (width && height && 
                  (parseFloat(width) > svgElement.clientWidth * 0.9) && 
                  (parseFloat(height) > svgElement.clientHeight * 0.9) &&
                  (parseFloat(x) < 10) && (parseFloat(y) < 10)) {
                rect.setAttribute('fill', 'transparent');
                rect.setAttribute('stroke', 'transparent');
              }
            });
            
            // Initialize all paths to low opacity
            const paths = svgElement.querySelectorAll('path, line, polyline, polygon, circle, ellipse, rect');
            paths.forEach((path) => {
              path.classList.add(styles.svgElement);
              if (path.hasAttribute('fill') && path.getAttribute('fill') !== 'none') {
                path.setAttribute('fill', 'transparent');
              }
            });
          }
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSvg();

    // Add global mouse move event listener
    document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
    };
  }, [src]);

  // Update element visibility based on mouse position
  useEffect(() => {
    if (svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path, line, polyline, polygon, circle, ellipse, rect');
        
        paths.forEach((path) => {
          const pathRect = path.getBoundingClientRect();
          const containerRect = svgContainerRef.current!.getBoundingClientRect();
          
          // Calculate the center of the path relative to the container
          const pathCenterX = pathRect.left + pathRect.width / 2 - containerRect.left;
          const pathCenterY = pathRect.top + pathRect.height / 2 - containerRect.top;
          
          // Calculate distance from mouse to path center
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - pathCenterX, 2) + 
            Math.pow(mousePosition.y - pathCenterY, 2)
          );
          
          // Make elements more visible as mouse gets closer
          const maxDistance = 150; // Maximum distance for visibility effect
          const opacity = distance < maxDistance 
            ? 1 - (distance / maxDistance) * 0.7 // At least 30% opacity
            : 0.3; // Base opacity
          
          (path as SVGElement).style.opacity = opacity.toString();
        });
      }
    }
  }, [mousePosition]);

  return (
    <div 
      ref={svgContainerRef} 
      className={`${styles.svgContainer} ${className}`}
      aria-label={alt}
      role="img"
      onMouseMove={handleMouseMove}
    />
  );
};

export default AnimatedSvg; 