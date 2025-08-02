const sampleUsers = [
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "hashedpassword1", // Use hashed value when storing in DB
      contactInfo: "123-456-7890",
      isActive: true,
    },
    {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      password: "hashedpassword2",
      contactInfo: "234-567-8901",
      isActive: true,
    },
    {
      name: "Clara Martinez",
      email: "clara.martinez@example.com",
      password: "hashedpassword3",
      contactInfo: "345-678-9012",
      isActive: true,
    },
    {
      name: "David Brown",
      email: "david.brown@example.com",
      password: "hashedpassword4",
      contactInfo: "456-789-0123",
      isActive: true,
    },
    {
      name: "Eva Green",
      email: "eva.green@example.com",
      password: "hashedpassword5",
      contactInfo: "567-890-1234",
      isActive: true,
    }
  ];
  
  module.exports = { data: sampleUsers };
  