export interface ComponentData {
  score: number;
  tier: 'entry-level' | 'mid-range' | 'high-end' | 'enthusiast';
  imageUrl?: string;
  baseClock?: number;
  boostClock?: number;
  cores?: number;
  threads?: number;
  vram?: number;
  powerConsumption?: number;
  releaseYear?: number;
}

export interface CPUData extends ComponentData {
  baseClock: number;
  boostClock: number;
  cores: number;
  threads: number;
  powerConsumption: number;
}

export interface GPUData extends ComponentData {
  vram: number;
  powerConsumption: number;
}

export const calculatorData = {
  cpus: {
    // 2025 Latest Processors
    "AMD Ryzen 9 9950X3D": { score: 125, tier: 'enthusiast' as const, baseClock: 4.2, boostClock: 5.7, cores: 16, threads: 32, powerConsumption: 170, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 9 9900X3D": { score: 124, tier: 'enthusiast' as const, baseClock: 4.4, boostClock: 5.6, cores: 12, threads: 24, powerConsumption: 120, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 7 9800X3D": { score: 122, tier: 'enthusiast' as const, baseClock: 4.7, boostClock: 5.2, cores: 8, threads: 16, powerConsumption: 120, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core Ultra 9 285K": { score: 116, tier: 'enthusiast' as const, baseClock: 3.7, boostClock: 5.7, cores: 24, threads: 24, powerConsumption: 250, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 9 9950X": { score: 118, tier: 'enthusiast' as const, baseClock: 4.3, boostClock: 5.7, cores: 16, threads: 32, powerConsumption: 170, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 9 9900X": { score: 115, tier: 'enthusiast' as const, baseClock: 4.4, boostClock: 5.6, cores: 12, threads: 24, powerConsumption: 120, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core Ultra 7 265K": { score: 108, tier: 'enthusiast' as const, baseClock: 3.9, boostClock: 5.5, cores: 20, threads: 20, powerConsumption: 180, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 7 9700X": { score: 110, tier: 'enthusiast' as const, baseClock: 3.8, boostClock: 5.5, cores: 8, threads: 16, powerConsumption: 65, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 5 9600X": { score: 102, tier: 'enthusiast' as const, baseClock: 3.9, boostClock: 5.4, cores: 6, threads: 12, powerConsumption: 65, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // 2024 Processors
    "Intel Core i9-14900KS": { score: 102, tier: 'enthusiast' as const, baseClock: 3.2, boostClock: 6.0, cores: 24, threads: 32, powerConsumption: 253, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i9-14900K": { score: 100, tier: 'enthusiast' as const, baseClock: 3.2, boostClock: 6.0, cores: 24, threads: 32, powerConsumption: 253, releaseYear: 2023, imageUrl: "https://i.imgur.com/4o7iY2A.png" },
    "Intel Core i7-14700K": { score: 95, tier: 'enthusiast' as const, baseClock: 3.4, boostClock: 5.6, cores: 20, threads: 28, powerConsumption: 253, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i5-14600K": { score: 90, tier: 'high-end' as const, baseClock: 3.5, boostClock: 5.3, cores: 14, threads: 20, powerConsumption: 181, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // 2023 Processors
    "AMD Ryzen 9 7950X3D": { score: 98, tier: 'enthusiast' as const, baseClock: 4.2, boostClock: 5.7, cores: 16, threads: 32, powerConsumption: 120, releaseYear: 2023, imageUrl: "https://i.imgur.com/S6FE88v.png" },
    "AMD Ryzen 7 7800X3D": { score: 96, tier: 'high-end' as const, baseClock: 4.2, boostClock: 5.0, cores: 8, threads: 16, powerConsumption: 120, releaseYear: 2023, imageUrl: "https://i.imgur.com/S6FE88v.png" },
    "Intel Core i9-13900K": { score: 98, tier: 'enthusiast' as const, baseClock: 3.0, boostClock: 5.8, cores: 24, threads: 32, powerConsumption: 253, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i7-13700K": { score: 90, tier: 'high-end' as const, baseClock: 3.4, boostClock: 5.4, cores: 16, threads: 24, powerConsumption: 253, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i5-13600K": { score: 90, tier: 'high-end' as const, baseClock: 3.5, boostClock: 5.1, cores: 14, threads: 20, powerConsumption: 181, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 9 7900X": { score: 94, tier: 'high-end' as const, baseClock: 4.7, boostClock: 5.6, cores: 12, threads: 24, powerConsumption: 170, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 7 7700X": { score: 92, tier: 'high-end' as const, baseClock: 4.5, boostClock: 5.4, cores: 8, threads: 16, powerConsumption: 105, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 5 7600X": { score: 88, tier: 'high-end' as const, baseClock: 4.7, boostClock: 5.3, cores: 6, threads: 12, powerConsumption: 105, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 5 7600": { score: 87, tier: 'high-end' as const, baseClock: 3.8, boostClock: 5.1, cores: 6, threads: 12, powerConsumption: 65, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // 2022 Processors
    "Intel Core i9-12900K": { score: 93, tier: 'high-end' as const, baseClock: 3.2, boostClock: 5.2, cores: 16, threads: 24, powerConsumption: 241, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i7-12700K": { score: 91, tier: 'high-end' as const, baseClock: 3.6, boostClock: 5.0, cores: 12, threads: 20, powerConsumption: 190, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i5-12600K": { score: 80, tier: 'mid-range' as const, baseClock: 3.7, boostClock: 4.9, cores: 10, threads: 16, powerConsumption: 150, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i5-12400": { score: 82, tier: 'mid-range' as const, baseClock: 2.5, boostClock: 4.4, cores: 6, threads: 12, powerConsumption: 65, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i7-12700H": { score: 84, tier: 'mid-range' as const, baseClock: 2.3, boostClock: 4.7, cores: 14, threads: 20, powerConsumption: 45, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // 2021 Processors
    "Intel Core i9-11900K": { score: 85, tier: 'high-end' as const, baseClock: 3.5, boostClock: 5.3, cores: 8, threads: 16, powerConsumption: 125, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i7-11700K": { score: 80, tier: 'mid-range' as const, baseClock: 3.6, boostClock: 5.0, cores: 8, threads: 16, powerConsumption: 125, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i5-11600K": { score: 75, tier: 'mid-range' as const, baseClock: 3.9, boostClock: 4.9, cores: 6, threads: 12, powerConsumption: 125, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // AMD 2020-2022 Processors
    "AMD Ryzen 9 5950X": { score: 89, tier: 'high-end' as const, baseClock: 3.4, boostClock: 4.9, cores: 16, threads: 32, powerConsumption: 105, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 7 5800X3D": { score: 85, tier: 'high-end' as const, baseClock: 3.4, boostClock: 4.5, cores: 8, threads: 16, powerConsumption: 105, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 7 5800X": { score: 84, tier: 'mid-range' as const, baseClock: 3.8, boostClock: 4.7, cores: 8, threads: 16, powerConsumption: 105, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 5 5600X": { score: 78, tier: 'mid-range' as const, baseClock: 3.7, boostClock: 4.6, cores: 6, threads: 12, powerConsumption: 65, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // 2020 Intel Processors
    "Intel Core i9-10900K": { score: 78, tier: 'mid-range' as const, baseClock: 3.7, boostClock: 5.3, cores: 10, threads: 20, powerConsumption: 125, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i7-10700K": { score: 70, tier: 'mid-range' as const, baseClock: 3.8, boostClock: 5.1, cores: 8, threads: 16, powerConsumption: 125, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i5-10600K": { score: 65, tier: 'mid-range' as const, baseClock: 4.1, boostClock: 4.8, cores: 6, threads: 12, powerConsumption: 125, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // Older but still relevant
    "AMD Ryzen 9 3950X": { score: 80, tier: 'mid-range' as const, baseClock: 3.5, boostClock: 4.7, cores: 16, threads: 32, powerConsumption: 105, releaseYear: 2019, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 9 3900X": { score: 75, tier: 'mid-range' as const, baseClock: 3.8, boostClock: 4.6, cores: 12, threads: 24, powerConsumption: 105, releaseYear: 2019, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 7 3700X": { score: 72, tier: 'mid-range' as const, baseClock: 3.6, boostClock: 4.4, cores: 8, threads: 16, powerConsumption: 65, releaseYear: 2019, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 5 3600X": { score: 68, tier: 'mid-range' as const, baseClock: 3.8, boostClock: 4.4, cores: 6, threads: 12, powerConsumption: 95, releaseYear: 2019, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 5 3600": { score: 65, tier: 'mid-range' as const, baseClock: 3.6, boostClock: 4.2, cores: 6, threads: 12, powerConsumption: 65, releaseYear: 2019, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Ryzen 7 2700X": { score: 62, tier: 'entry-level' as const, baseClock: 3.7, boostClock: 4.3, cores: 8, threads: 16, powerConsumption: 105, releaseYear: 2018, imageUrl: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i5-9600K": { score: 60, tier: 'entry-level' as const, baseClock: 3.7, boostClock: 4.6, cores: 6, threads: 6, powerConsumption: 95, releaseYear: 2018, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Core i7-8700K": { score: 60, tier: 'entry-level' as const, baseClock: 3.7, boostClock: 4.7, cores: 6, threads: 12, powerConsumption: 95, releaseYear: 2017, imageUrl: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // Apple Silicon
    "Apple M2 Ultra": { score: 98, tier: 'enthusiast' as const, baseClock: 3.5, boostClock: 3.5, cores: 24, threads: 24, powerConsumption: 60, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M1 Ultra": { score: 95, tier: 'enthusiast' as const, baseClock: 3.2, boostClock: 3.2, cores: 20, threads: 20, powerConsumption: 60, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M2 Max": { score: 88, tier: 'high-end' as const, baseClock: 3.5, boostClock: 3.5, cores: 12, threads: 12, powerConsumption: 30, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M3 Pro": { score: 85, tier: 'high-end' as const, baseClock: 4.0, boostClock: 4.0, cores: 12, threads: 12, powerConsumption: 25, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M2 Pro": { score: 80, tier: 'mid-range' as const, baseClock: 3.5, boostClock: 3.5, cores: 12, threads: 12, powerConsumption: 30, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M3": { score: 78, tier: 'mid-range' as const, baseClock: 4.0, boostClock: 4.0, cores: 8, threads: 8, powerConsumption: 20, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M2": { score: 75, tier: 'mid-range' as const, baseClock: 3.5, boostClock: 3.5, cores: 8, threads: 8, powerConsumption: 20, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M1 Pro": { score: 72, tier: 'mid-range' as const, baseClock: 3.2, boostClock: 3.2, cores: 10, threads: 10, powerConsumption: 30, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M1": { score: 68, tier: 'mid-range' as const, baseClock: 3.2, boostClock: 3.2, cores: 8, threads: 8, powerConsumption: 20, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
  },
  gpus: {
    // 2025 Latest GPUs
    "NVIDIA GeForce RTX 5090": { score: 140, tier: 'enthusiast' as const, vram: 32, powerConsumption: 500, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 5080": { score: 120, tier: 'enthusiast' as const, vram: 16, powerConsumption: 350, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 5070 Ti": { score: 105, tier: 'enthusiast' as const, vram: 16, powerConsumption: 300, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 5070": { score: 95, tier: 'enthusiast' as const, vram: 12, powerConsumption: 250, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 5060 Ti": { score: 85, tier: 'high-end' as const, vram: 16, powerConsumption: 200, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 5060": { score: 75, tier: 'mid-range' as const, vram: 8, powerConsumption: 150, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 5050": { score: 65, tier: 'mid-range' as const, vram: 8, powerConsumption: 120, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // AMD 2025 GPUs
    "AMD Radeon RX 9070 XT": { score: 102, tier: 'enthusiast' as const, vram: 16, powerConsumption: 320, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 9070": { score: 92, tier: 'high-end' as const, vram: 12, powerConsumption: 280, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 9060 XT": { score: 82, tier: 'high-end' as const, vram: 12, powerConsumption: 200, releaseYear: 2025, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // Intel 2024-2025 GPUs
    "Intel Arc Battlemage 24GB": { score: 94, tier: 'high-end' as const, vram: 24, powerConsumption: 250, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Arc B770": { score: 78, tier: 'mid-range' as const, vram: 16, powerConsumption: 225, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Arc B580": { score: 68, tier: 'mid-range' as const, vram: 12, powerConsumption: 190, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // 2022-2024 NVIDIA GPUs
    "NVIDIA GeForce RTX 4090": { score: 100, tier: 'enthusiast' as const, vram: 24, powerConsumption: 450, releaseYear: 2022, imageUrl: "https://i.imgur.com/z2x4UG9.png" },
    "NVIDIA GeForce RTX 4080 Super": { score: 95, tier: 'high-end' as const, vram: 16, powerConsumption: 320, releaseYear: 2024, imageUrl: "https://i.imgur.com/z2x4UG9.png" },
    "NVIDIA GeForce RTX 4070 Ti Super": { score: 90, tier: 'high-end' as const, vram: 16, powerConsumption: 285, releaseYear: 2024, imageUrl: "https://i.imgur.com/uCHO0Lq.png" },
    "NVIDIA GeForce RTX 4070 Super": { score: 88, tier: 'high-end' as const, vram: 12, powerConsumption: 220, releaseYear: 2024, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 4060 Ti": { score: 80, tier: 'mid-range' as const, vram: 16, powerConsumption: 160, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 4060": { score: 70, tier: 'mid-range' as const, vram: 8, powerConsumption: 115, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // 2022 AMD GPUs
    "AMD Radeon RX 7900 XTX": { score: 98, tier: 'enthusiast' as const, vram: 24, powerConsumption: 355, releaseYear: 2022, imageUrl: "https://i.imgur.com/mSSTK2B.png" },
    "AMD Radeon RX 7900 XT": { score: 92, tier: 'high-end' as const, vram: 20, powerConsumption: 315, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 7800 XT": { score: 85, tier: 'high-end' as const, vram: 16, powerConsumption: 263, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 7700 XT": { score: 78, tier: 'mid-range' as const, vram: 12, powerConsumption: 245, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 7600": { score: 68, tier: 'mid-range' as const, vram: 8, powerConsumption: 165, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // 2020-2021 GPUs
    "NVIDIA GeForce RTX 3090 Ti": { score: 90, tier: 'high-end' as const, vram: 24, powerConsumption: 450, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 3080": { score: 85, tier: 'high-end' as const, vram: 10, powerConsumption: 320, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 3070 Ti": { score: 82, tier: 'mid-range' as const, vram: 8, powerConsumption: 290, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 3070": { score: 78, tier: 'mid-range' as const, vram: 8, powerConsumption: 220, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 3060 Ti": { score: 75, tier: 'mid-range' as const, vram: 8, powerConsumption: 200, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 3060": { score: 68, tier: 'mid-range' as const, vram: 12, powerConsumption: 170, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 2080 Ti": { score: 70, tier: 'mid-range' as const, vram: 11, powerConsumption: 260, releaseYear: 2018, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce RTX 2070 Super": { score: 65, tier: 'mid-range' as const, vram: 8, powerConsumption: 215, releaseYear: 2019, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // AMD 2020-2022 GPUs
    "AMD Radeon RX 6950 XT": { score: 88, tier: 'high-end' as const, vram: 16, powerConsumption: 335, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 6800 XT": { score: 82, tier: 'mid-range' as const, vram: 16, powerConsumption: 300, releaseYear: 2020, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 6700 XT": { score: 75, tier: 'mid-range' as const, vram: 12, powerConsumption: 230, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 6700": { score: 70, tier: 'mid-range' as const, vram: 10, powerConsumption: 175, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 6600 XT": { score: 65, tier: 'mid-range' as const, vram: 8, powerConsumption: 160, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 6600": { score: 60, tier: 'entry-level' as const, vram: 8, powerConsumption: 132, releaseYear: 2021, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "AMD Radeon RX 5700 XT": { score: 65, tier: 'mid-range' as const, vram: 8, powerConsumption: 225, releaseYear: 2019, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // Intel Arc GPUs
    "Intel Arc A770": { score: 60, tier: 'entry-level' as const, vram: 16, powerConsumption: 225, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Arc A750": { score: 55, tier: 'entry-level' as const, vram: 8, powerConsumption: 225, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Arc A580": { score: 50, tier: 'entry-level' as const, vram: 8, powerConsumption: 185, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "Intel Arc A380": { score: 40, tier: 'entry-level' as const, vram: 6, powerConsumption: 75, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // Older but still relevant
    "NVIDIA GeForce GTX 1080 Ti": { score: 60, tier: 'entry-level' as const, vram: 11, powerConsumption: 250, releaseYear: 2017, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce GTX 1070": { score: 50, tier: 'entry-level' as const, vram: 8, powerConsumption: 150, releaseYear: 2016, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    "NVIDIA GeForce GTX 1660 Super": { score: 45, tier: 'entry-level' as const, vram: 6, powerConsumption: 125, releaseYear: 2019, imageUrl: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // Apple Silicon GPUs
    "Apple M3 Max (GPU)": { score: 85, tier: 'high-end' as const, vram: 48, powerConsumption: 40, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M2 Max (GPU)": { score: 78, tier: 'mid-range' as const, vram: 38, powerConsumption: 35, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M3 Pro (GPU)": { score: 75, tier: 'mid-range' as const, vram: 36, powerConsumption: 30, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M2 Pro (GPU)": { score: 70, tier: 'mid-range' as const, vram: 32, powerConsumption: 30, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M3 (GPU)": { score: 68, tier: 'mid-range' as const, vram: 24, powerConsumption: 25, releaseYear: 2023, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    "Apple M2 (GPU)": { score: 65, tier: 'mid-range' as const, vram: 24, powerConsumption: 25, releaseYear: 2022, imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
  },
  ramImpact: {
    "8": 0.9,
    "16": 1.0,
    "32": 1.05,
    "64": 1.1
  },
  purposeImpact: {
    gaming: { cpu: 0.9, gpu: 1.1 },
    streaming: { cpu: 1.1, gpu: 1.0 },
    video_editing: { cpu: 1.15, gpu: 0.95 },
    "3d_rendering": { cpu: 1.05, gpu: 1.05 },
    general: { cpu: 1.0, gpu: 1.0 }
  },
  resolutionImpact: {
    "1080p": 1.0,
    "1440p": 0.85,
    "4k": 0.65,
    "ultrawide": 0.9
  }
};

export const placeholderImages = {
  cpu: "https://i.imgur.com/PHYyIxl.png",
  gpu: "https://i.imgur.com/Jprx55s.png"
};

// Updated market pricing data (2025 estimates)
export const marketPrices = {
  cpus: {
    "AMD Ryzen 9 9950X3D": 699,
    "AMD Ryzen 9 9900X3D": 599,
    "AMD Ryzen 7 9800X3D": 479,
    "AMD Ryzen 9 9950X": 649,
    "Intel Core Ultra 9 285K": 589,
    "AMD Ryzen 9 9900X": 549,
    "AMD Ryzen 7 9700X": 359,
    "Intel Core Ultra 7 265K": 394,
    "AMD Ryzen 5 9600X": 279,
    "Intel Core i9-14900KS": 699,
    "Intel Core i9-14900K": 589,
    "AMD Ryzen 9 7950X3D": 699,
    "Intel Core i9-13900K": 589,
    "Apple M2 Ultra": 3999,
    "AMD Ryzen 7 7800X3D": 449,
    "Intel Core i7-14700K": 409,
    "Apple M1 Ultra": 3999,
    "AMD Ryzen 9 7900X": 549,
    "Intel Core i9-12900K": 589,
    "AMD Ryzen 7 7700X": 399,
    "Intel Core i7-12700K": 409,
    "Intel Core i5-14600K": 319,
    "Intel Core i7-13700K": 409,
    "Intel Core i5-13600K": 319,
    "AMD Ryzen 9 5950X": 799,
    "AMD Ryzen 5 7600X": 299,
    "Apple M2 Max": 2499,
    "AMD Ryzen 5 7600": 229,
    "AMD Ryzen 7 5800X3D": 449,
    "Intel Core i9-11900K": 539,
    "Apple M3 Pro": 1999,
    "AMD Ryzen 7 5800X": 449,
    "Intel Core i7-12700H": 409,
    "Intel Core i5-12400": 192,
    "Intel Core i5-12600K": 289,
    "Intel Core i7-11700K": 409,
    "AMD Ryzen 9 3950X": 749,
    "Apple M2 Pro": 1299,
    "AMD Ryzen 5 5600X": 299,
    "Intel Core i9-10900K": 488,
    "Apple M3": 1599,
    "Intel Core i5-11600K": 262,
    "Apple M2": 1199,
    "AMD Ryzen 9 3900X": 499,
    "Apple M1 Pro": 1999,
    "AMD Ryzen 7 3700X": 329,
    "Intel Core i7-10700K": 374,
    "Intel Core i9-9900K": 488,
    "Apple M1": 999,
    "AMD Ryzen 5 3600X": 249,
    "AMD Ryzen 5 3600": 199,
    "Intel Core i5-10600K": 262,
    "AMD Ryzen 7 2700X": 329,
    "Intel Core i5-9600K": 262,
    "Intel Core i7-8700K": 359,
  },
  gpus: {
    "NVIDIA GeForce RTX 5090": 1999,
    "NVIDIA GeForce RTX 5080": 999,
    "NVIDIA GeForce RTX 5070 Ti": 749,
    "NVIDIA GeForce RTX 5070": 549,
    "NVIDIA GeForce RTX 5060 Ti": 399,
    "NVIDIA GeForce RTX 5060": 299,
    "NVIDIA GeForce RTX 5050": 199,
    "AMD Radeon RX 9070 XT": 679,
    "AMD Radeon RX 9070": 549,
    "AMD Radeon RX 9060 XT": 399,
    "Intel Arc Battlemage 24GB": 549,
    "Intel Arc B770": 329,
    "Intel Arc B580": 249,
    "NVIDIA GeForce RTX 4090": 1599,
    "AMD Radeon RX 7900 XTX": 999,
    "NVIDIA GeForce RTX 4080 Super": 999,
    "AMD Radeon RX 7900 XT": 899,
    "NVIDIA GeForce RTX 4070 Ti Super": 799,
    "NVIDIA GeForce RTX 3090 Ti": 1999,
    "AMD Radeon RX 6950 XT": 1099,
    "NVIDIA GeForce RTX 4070 Super": 599,
    "Apple M3 Max (GPU)": 3199,
    "NVIDIA GeForce RTX 3080": 699,
    "AMD Radeon RX 7800 XT": 499,
    "AMD Radeon RX 6800 XT": 649,
    "NVIDIA GeForce RTX 3070 Ti": 599,
    "NVIDIA GeForce RTX 4060 Ti": 399,
    "NVIDIA GeForce RTX 3070": 499,
    "AMD Radeon RX 7700 XT": 449,
    "Apple M2 Max (GPU)": 2499,
    "AMD Radeon RX 6700 XT": 479,
    "NVIDIA GeForce RTX 3060 Ti": 399,
    "Apple M3 Pro (GPU)": 1999,
    "NVIDIA GeForce RTX 2080 Ti": 1199,
    "NVIDIA GeForce RTX 4060": 299,
    "AMD Radeon RX 6700": 369,
    "Apple M2 Pro (GPU)": 1299,
    "AMD Radeon RX 7600": 269,
    "NVIDIA GeForce RTX 3060": 329,
    "Apple M3 (GPU)": 1599,
    "AMD Radeon RX 5700 XT": 399,
    "Apple M2 (GPU)": 1199,
    "AMD Radeon RX 6600 XT": 379,
    "NVIDIA GeForce RTX 2070 Super": 499,
    "Intel Arc A770": 329,
    "Intel Arc A750": 289,
    "Intel Arc A580": 179,
    "Intel Arc A380": 139,
    "NVIDIA GeForce GTX 1080 Ti": 699,
    "AMD Radeon RX 6600": 329,
    "NVIDIA GeForce GTX 1070": 379,
    "NVIDIA GeForce GTX 1660 Super": 229,
  }
};

// Latest games data (2020-2025)
export const gamesData = {
  // 2025 Games
  "GTA VI": { baseFps: 60, cpuWeight: 0.6, gpuWeight: 0.4, releaseYear: 2025, category: 'AAA' },
  "Marvel's Wolverine": { baseFps: 70, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2025, category: 'AAA' },
  
  // 2024 Games
  "Black Myth: Wukong": { baseFps: 65, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2024, category: 'AAA' },
  "Dragon's Dogma 2": { baseFps: 70, cpuWeight: 0.5, gpuWeight: 0.5, releaseYear: 2024, category: 'AAA' },
  "Helldivers 2": { baseFps: 90, cpuWeight: 0.6, gpuWeight: 0.4, releaseYear: 2024, category: 'AAA' },
  "Palworld": { baseFps: 80, cpuWeight: 0.7, gpuWeight: 0.3, releaseYear: 2024, category: 'Indie' },
  "Indiana Jones and the Great Circle": { baseFps: 65, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2024, category: 'AAA' },
  
  // 2023 Games
  "Cyberpunk 2077": { baseFps: 70, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2020, category: 'AAA' },
  "Starfield": { baseFps: 60, cpuWeight: 0.6, gpuWeight: 0.4, releaseYear: 2023, category: 'AAA' },
  "Baldur's Gate 3": { baseFps: 90, cpuWeight: 0.65, gpuWeight: 0.35, releaseYear: 2023, category: 'AAA' },
  "Spider-Man 2": { baseFps: 75, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2023, category: 'AAA' },
  "Alan Wake 2": { baseFps: 60, cpuWeight: 0.3, gpuWeight: 0.7, releaseYear: 2023, category: 'AAA' },
  "Hogwarts Legacy": { baseFps: 70, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2023, category: 'AAA' },
  "Dead Space (2023)": { baseFps: 75, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2023, category: 'AAA' },
  "Resident Evil 4 (2023)": { baseFps: 80, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2023, category: 'AAA' },
  
  // 2022 Games
  "Elden Ring": { baseFps: 60, cpuWeight: 0.5, gpuWeight: 0.5, releaseYear: 2022, category: 'AAA' },
  "God of War": { baseFps: 80, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2022, category: 'AAA' },
  "Horizon Forbidden West": { baseFps: 70, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2022, category: 'AAA' },
  "A Plague Tale: Requiem": { baseFps: 65, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2022, category: 'AAA' },
  
  // 2021 Games
  "Forza Horizon 5": { baseFps: 90, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2021, category: 'AAA' },
  "Battlefield 2042": { baseFps: 80, cpuWeight: 0.6, gpuWeight: 0.4, releaseYear: 2021, category: 'AAA' },
  "Halo Infinite": { baseFps: 85, cpuWeight: 0.5, gpuWeight: 0.5, releaseYear: 2021, category: 'AAA' },
  "Far Cry 6": { baseFps: 75, cpuWeight: 0.5, gpuWeight: 0.5, releaseYear: 2021, category: 'AAA' },
  
  // 2020 Games
  "Call of Duty: Modern Warfare III": { baseFps: 140, cpuWeight: 0.5, gpuWeight: 0.5, releaseYear: 2023, category: 'AAA' },
  "Red Dead Redemption 2": { baseFps: 80, cpuWeight: 0.4, gpuWeight: 0.6, releaseYear: 2019, category: 'AAA' },
  "The Witcher 3: Wild Hunt": { baseFps: 110, cpuWeight: 0.3, gpuWeight: 0.7, releaseYear: 2015, category: 'AAA' },
  
  // Esports Games (Updated)
  "Valorant": { baseFps: 350, cpuWeight: 0.7, gpuWeight: 0.3, releaseYear: 2020, category: 'Esports' },
  "Counter-Strike 2": { baseFps: 300, cpuWeight: 0.7, gpuWeight: 0.3, releaseYear: 2023, category: 'Esports' },
  "Fortnite": { baseFps: 200, cpuWeight: 0.6, gpuWeight: 0.4, releaseYear: 2017, category: 'Esports' },
  "Apex Legends": { baseFps: 180, cpuWeight: 0.5, gpuWeight: 0.5, releaseYear: 2019, category: 'Esports' },
  "Overwatch 2": { baseFps: 220, cpuWeight: 0.6, gpuWeight: 0.4, releaseYear: 2022, category: 'Esports' },
  "League of Legends": { baseFps: 400, cpuWeight: 0.8, gpuWeight: 0.2, releaseYear: 2009, category: 'Esports' },
  "Rocket League": { baseFps: 250, cpuWeight: 0.6, gpuWeight: 0.4, releaseYear: 2015, category: 'Esports' },
};

// PSU data for power calculations
export const psuData = {
  cpus: {
    "AMD Ryzen 9 9950X3D": 180, "AMD Ryzen 9 9900X3D": 150, "AMD Ryzen 7 9800X3D": 130, "AMD Ryzen 9 9950X": 170,
    "Intel Core Ultra 9 285K": 250, "AMD Ryzen 9 9900X": 150, "AMD Ryzen 7 9700X": 120, "Intel Core Ultra 7 265K": 180,
    "AMD Ryzen 5 9600X": 105, "Intel Core i9-14900KS": 253, "Intel Core i9-14900K": 253, "AMD Ryzen 9 7950X3D": 120,
    "Intel Core i9-13900K": 253, "AMD Ryzen 7 7800X3D": 120, "Intel Core i7-14700K": 253, "AMD Ryzen 9 7900X": 170,
    "Intel Core i9-12900K": 241, "AMD Ryzen 7 7700X": 105, "Intel Core i5-14600K": 181, "Intel Core i7-13700K": 253,
    "Intel Core i5-13600K": 181, "AMD Ryzen 9 5950X": 105, "AMD Ryzen 5 7600X": 105, "AMD Ryzen 5 7600": 65,
    "AMD Ryzen 7 5800X3D": 105, "Intel Core i9-11900K": 125, "AMD Ryzen 7 5800X": 105, "Intel Core i5-12400": 65,
    "Intel Core i7-11700K": 125, "Intel Core i5-12600K": 150, "AMD Ryzen 9 3950X": 105, "AMD Ryzen 5 5600X": 65,
    "Intel Core i9-10900K": 125, "AMD Ryzen 9 3900X": 105, "Intel Core i5-11600K": 125, "AMD Ryzen 7 3700X": 65,
    "Intel Core i7-10700K": 125, "Intel Core i9-9900K": 95, "AMD Ryzen 5 3600X": 95, "AMD Ryzen 5 3600": 65,
    "Intel Core i5-10600K": 125, "AMD Ryzen 7 2700X": 105, "Intel Core i5-9600K": 95, "Intel Core i7-8700K": 95,
    "Intel Core i7-12700H": 45, "Apple M2 Ultra": 60, "Apple M1 Ultra": 60, "Apple M2 Max": 30, "Apple M3 Pro": 25,
    "Apple M2 Pro": 30, "Apple M3": 20, "Apple M2": 20, "Apple M1 Pro": 30, "Apple M1": 20
  },
  gpus: {
    "NVIDIA GeForce RTX 5090": 500, "NVIDIA GeForce RTX 5080": 350, "NVIDIA GeForce RTX 5070 Ti": 300,
    "NVIDIA GeForce RTX 5070": 250, "NVIDIA GeForce RTX 5060 Ti": 200, "NVIDIA GeForce RTX 5060": 150,
    "NVIDIA GeForce RTX 5050": 120, "AMD Radeon RX 9070 XT": 320, "AMD Radeon RX 9070": 280,
    "AMD Radeon RX 9060 XT": 200, "Intel Arc Battlemage 24GB": 250, "Intel Arc B770": 225, "Intel Arc B580": 190,
    "NVIDIA GeForce RTX 4090": 450, "AMD Radeon RX 7900 XTX": 355, "NVIDIA GeForce RTX 3090 Ti": 450,
    "AMD Radeon RX 6950 XT": 335, "NVIDIA GeForce RTX 4080 Super": 320, "AMD Radeon RX 7900 XT": 315,
    "NVIDIA GeForce RTX 4070 Ti Super": 285, "NVIDIA GeForce RTX 3080": 320, "AMD Radeon RX 6800 XT": 300,
    "NVIDIA GeForce RTX 4070 Super": 220, "NVIDIA GeForce RTX 3070 Ti": 290, "AMD Radeon RX 7800 XT": 263,
    "NVIDIA GeForce RTX 2080 Ti": 260, "NVIDIA GeForce RTX 3070": 220, "AMD Radeon RX 7700 XT": 245,
    "NVIDIA GeForce RTX 4060 Ti": 160, "AMD Radeon RX 5700 XT": 225, "NVIDIA GeForce RTX 3060 Ti": 200,
    "AMD Radeon RX 6700 XT": 230, "NVIDIA GeForce RTX 4060": 115, "AMD Radeon RX 6700": 175,
    "NVIDIA GeForce RTX 3060": 170, "AMD Radeon RX 7600": 165, "NVIDIA GeForce RTX 2070 Super": 215,
    "AMD Radeon RX 6600 XT": 160, "NVIDIA GeForce GTX 1080 Ti": 250, "AMD Radeon RX 6600": 132,
    "Intel Arc A770": 225, "Intel Arc A750": 200, "Intel Arc A580": 185, "Intel Arc A380": 75,
    "NVIDIA GeForce GTX 1070": 150, "NVIDIA GeForce GTX 1660 Super": 125, "Apple M3 Max (GPU)": 40,
    "Apple M2 Max (GPU)": 35, "Apple M3 Pro (GPU)": 30, "Apple M2 Pro (GPU)": 30, "Apple M3 (GPU)": 25,
    "Apple M2 (GPU)": 25
  },
  other: {
    RAM_PER_STICK: 5,
    SSD_PER_DRIVE: 8,
    HDD_PER_DRIVE: 10,
    FANS_AND_MOTHERBOARD: 50
  }
};

// Resolution multipliers for FPS calculations
export const resolutionMultipliers = {
  "1080p": 1.2,
  "1440p": 1.0,
  "4k": 0.7
};

// Helper function to sort components by score (high to low)
export const getSortedComponents = (components: Record<string, ComponentData>) => {
  return Object.entries(components)
    .sort(([, a], [, b]) => b.score - a.score)
    .map(([name]) => name);
};

// Helper function to get component tier color
export const getTierColor = (tier: string) => {
  switch (tier) {
    case 'enthusiast': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
    case 'high-end': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    case 'mid-range': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    case 'entry-level': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20';
    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  }
};