const ProductData = [
  {
    id: 1,
    brandName: 'Frooti',
    priceOptions: [
      {
        id: 1,
        mrp: 10.00,
        variants: [
          { id: 1, description: 'Frooti'},
          { id: 2, description: 'Fizz'},
          { id: 3, description: 'Large'}
        ]
      },
      {
        id: 2,
        mrp: 20.00,
        variants: [
          { id: 4, description: 'Frooti'},
          { id: 5, description: 'Fizz'}
        ]
      },
      {
        id: 3,
        mrp: 108.00,
        variants: [
          { id: 6, description: 'Frooti'},
          { id: 7, description: 'Medium'}
        ]
      }
    ]
  },
  {
    id: 2,
    brandName: 'Unibic',
    priceOptions: [
      {
        id: 4,
        mrp: 5.00,
        variants: [
          { id: 8, description: 'Coconut'},
          { id: 9, description: 'Chocolate'}
        ]
      },
      {
        id: 5,
        mrp: 10.00,
        variants: [
          { id: 10, description: 'Chocolate'},
          { id: 11, description: 'Orange'}
        ]
      }
    ]
  },
  {
    id: 3,
    brandName: 'Paper Boat',
    priceOptions: [
      {
        id: 6,
        mrp: 10.00,
        variants: [
          { id: 12, description: 'Swing'},
          { id: 13, description: 'Zeera'}
        ]
      },
      {
        id: 7,
        mrp: 20.00,
        variants: [
          { id: 14, description: 'Zeera'},
          { id: 15, description: 'Premium'}
        ]
      }
    ]
  }
];

export default ProductData;

// const initialProducts = [
//   {
//     id: 1,
//     name: "Product A",
//     priceOptions: [
//       {
//         id: 1,
//         price: 5.0,
//         variants: [
//           { id: 1, size: "Small", color: "Red" },
//           { id: 2, size: "Medium", color: "Blue" },
//           { id: 3, size: "Large", color: "Green" },
//         ],
//       },
//       {
//         id: 2,
//         price: 7.5,
//         variants: [
//           { id: 4, size: "Regular", color: "Black" },
//           { id: 5, size: "Large", color: "White" },
//         ],
//       },
//       {
//         id: 3,
//         price: 10.0,
//         variants: [
//           { id: 6, size: "Small", color: "Yellow" },
//           { id: 7, size: "Medium", color: "Purple" },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Product B",
//     priceOptions: [
//       {
//         id: 4,
//         price: 6.0,
//         variants: [
//           { id: 8, size: "Small", color: "Blue" },
//           { id: 9, size: "Large", color: "Green" },
//         ],
//       },
//       {
//         id: 5,
//         price: 8.0,
//         variants: [
//           { id: 10, size: "Regular", color: "Black" },
//           { id: 11, size: "Large", color: "White" },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Product C",
//     priceOptions: [
//       {
//         id: 6,
//         price: 4.0,
//         variants: [
//           { id: 12, size: "Small", color: "Yellow" },
//           { id: 13, size: "Medium", color: "Purple" },
//         ],
//       },
//       {
//         id: 7,
//         price: 5.0,
//         variants: [
//           { id: 14, size: "Regular", color: "Black" },
//           { id: 15, size: "Large", color: "White" },
//         ],
//       },
//     ],
//   },
// ];


// const ProductData = [
//     { id: 1, brandName: "Frooti", mrp: 10, description: "Tetra" },
//     { id: 2, brandName: "Fizz", mrp: 10, description: "PET" },
//     { id: 3, brandName: "Swing", mrp: 10, description: "Tetra" },
//     { id: 4, brandName: "PB Zeera", mrp: 20, description: "PET" }
//   ];