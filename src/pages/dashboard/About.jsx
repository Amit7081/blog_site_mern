import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 sm:min-h-screen md:w-full p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6">
          Welcome to our website! We are [Your Organization Name], and our mission is to [briefly describe your mission or purpose].
        </p>
        <h2 className="text-2xl font-bold mb-2">Our History</h2>
        <p className="mb-6">
          [Provide a brief history of your organization, including its founding and key milestones.]
        </p>
        <h2 className="text-2xl font-bold mb-2">Our Team</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Replace the placeholders with your team members' information */}
          <div className="bg-white p-4 rounded shadow">
            <img src="team-member-1.jpg" alt="Team Member 1" className="w-full h-32 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p>CEO</p>
          </div>
          {/* Repeat the above structure for each team member */}
        </div>
        <h2 className="text-2xl font-bold mb-2">Our Values</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Value 1: [Briefly describe your first core value.]</li>
          <li>Value 2: [Briefly describe your second core value.]</li>
          {/* Add more values if needed */}
        </ul>
        <h2 className="text-2xl font-bold mb-2">Our Services</h2>
        <p className="mb-6">
          [Describe your main services or products here.]
        </p>
        <h2 className="text-2xl font-bold mb-2">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Replace the placeholders with your testimonials */}
          <div className="bg-white p-4 rounded shadow">
            <p className="italic text-gray-600">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac tellus ac lorem mattis sagittis eu eu nisi."
            </p>
            <p className="font-semibold mt-2">- Jane Doe, Customer</p>
          </div>
          {/* Repeat the above structure for each testimonial */}
        </div>
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p className="mb-4">Feel free to reach out to us for any inquiries or collaboration opportunities:</p>
        <p>Email: info@example.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        {/* You can also add a contact form here if desired */}
      </div>
    </div>
  );
};

export default About;