export const MOCK_PROPERTIES = [
  { 
    id: 1, 
    title: 'Luxury 3BHK Apartment', 
    location: 'Bandra West, Mumbai', 
    price: '₹3.5 Cr', 
    type: 'Apartment', 
    area: '1850 sq.ft', 
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    beds: 3, baths: 3, balconies: 2,
    facing: 'East Facing', status: 'Ready to Move',
    description: 'Experience unparalleled luxury in this stunning 3BHK apartment located in the heart of Bandra West. Featuring premium Italian marble flooring, a modular kitchen with built-in appliances, and uninterrupted views of the Arabian Sea. The building offers world-class amenities including a rooftop infinity pool and a state-of-the-art gymnasium.',
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Park', 'Clubhouse'],
    agent: { name: 'Rahul Kumar', phone: '+91 98765 43210', initial: 'RK', rating: '4.8', color: '#6366f1' }
  },
  { 
    id: 2, 
    title: 'Premium 4BHK Villa', 
    location: 'Whitefield, Bangalore', 
    price: '₹4.2 Cr', 
    type: 'Villa', 
    area: '3200 sq.ft', 
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    ],
    beds: 4, baths: 5, balconies: 3,
    facing: 'North Facing', status: 'Newly Built',
    description: 'A spectacular independent villa surrounded by lush greenery in Whitefield. This property boasts a private garden, teakwood doors, imported bath fittings, and a smart-home automation system. Perfect for large families seeking privacy within a high-security gated community.',
    amenities: ['Private Garden', 'Smart Home', 'Gym', 'Security', 'Parking', 'Pet Friendly'],
    agent: { name: 'Priya Sharma', phone: '+91 99887 76655', initial: 'PS', rating: '4.9', color: '#f59e0b' }
  },
  { 
    id: 3, 
    title: 'Modern Studio Apartment', 
    location: 'Kharadi, Pune', 
    price: '₹65 L', 
    type: 'Apartment', 
    area: '650 sq.ft', 
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1f52dae833?auto=format&fit=crop&w=800&q=80'
    ],
    beds: 1, baths: 1, balconies: 1,
    facing: 'West Facing', status: 'Under Construction',
    description: 'Compact, ultra-modern studio perfect for young professionals. Located adjacent to the IT Park in Kharadi, offering a zero-commute lifestyle. Fully furnished with space-saving smart furniture. Excellent investment opportunity with high rental yield.',
    amenities: ['Gym', 'Security', 'Co-working Space', 'Cafeteria'],
    agent: { name: 'Arjun Joshi', phone: '+91 91234 56789', initial: 'AJ', rating: '4.5', color: '#10b981' }
  },
  { 
    id: 4, 
    title: 'Commercial Office Space', 
    location: 'Cyber City, Gurgaon', 
    price: '₹5.5 Cr', 
    type: 'Commercial', 
    area: '4500 sq.ft', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    ],
    beds: 0, baths: 4, balconies: 0,
    facing: 'North-East', status: 'Ready to Move',
    description: 'Premium A-grade office space in the bustling Cyber City hub. Features open floor plan, glass cabins, central air conditioning, and a massive cafeteria area. Includes 6 reserved covered parking spots. Ideal for IT/ITES companies.',
    amenities: ['Central AC', 'Security', 'Parking', 'Cafeteria', 'Elevators', 'Power Backup'],
    agent: { name: 'Rahul Kumar', phone: '+91 98765 43210', initial: 'RK', rating: '4.8', color: '#6366f1' }
  },
  { 
    id: 5, 
    title: 'Sea View 2BHK', 
    location: 'Worli, Mumbai', 
    price: '₹2.8 Cr', 
    type: 'Apartment', 
    area: '1100 sq.ft', 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    beds: 2, baths: 2, balconies: 1,
    facing: 'West Facing', status: 'Ready to Move',
    description: 'A cozy 2BHK that commands brilliant sunset views over the Arabian sea. Located in a high-rise tower in Worli. The complex features a massive podium garden, a fully equipped gym, and a temperature-controlled swimming pool.',
    amenities: ['Pool', 'Gym', 'Security', 'Sea View', 'Clubhouse'],
    agent: { name: 'Maya Nair', phone: '+91 95555 44444', initial: 'MN', rating: '4.7', color: '#ef4444' }
  },
  { 
    id: 6, 
    title: 'Residential Plot', 
    location: 'ECR, Chennai', 
    price: '₹1.2 Cr', 
    type: 'Plot', 
    area: '2400 sq.ft', 
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80'
    ],
    beds: 0, baths: 0, balconies: 0,
    facing: 'East Facing', status: 'Ready for Development',
    description: 'Prime residential plot situated just off the scenic East Coast Road. The gated layout is fully compounded with paved internal roads, street lights, and clear titles. Build your dream beach house right here.',
    amenities: ['Gated Community', 'Security', 'Water Supply', 'Clear Title'],
    agent: { name: 'Arjun Joshi', phone: '+91 91234 56789', initial: 'AJ', rating: '4.5', color: '#10b981' }
  }
];
