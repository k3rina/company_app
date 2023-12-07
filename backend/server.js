const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());

const fakeCompanies = [
  {
    id: 1,
    name: 'Tech Solutions',
    employee_count: 6,
    address: '123 Main Street, Cityville',
  },
  {
    id: 2,
    name: 'Innovate Corp',
    employee_count: 5,
    address: '456 Innovation Avenue, Tech City',
  },
  {
    id: 3,
    name: 'Data Innovators',
    employee_count: 4,
    address: '789 Data Drive, Datatown',
  },
  {
    id: 4,
    name: 'EcoTech Industries',
    employee_count: 3,
    address: '101 Green Street, Ecotown',
  },
  {
    id: 5,
    name: 'Global Connect',
    employee_count: 9,
    address: '567 Networking Blvd, Connect City',
  },
  {
    id: 6,
    name: 'Future Systems',
    employee_count: 8,
    address: '876 Futuristic Ave, Tech Future',
  },
  {
    id: 7,
    name: 'Creative Minds Ltd',
    employee_count: 7,
    address: '234 Imagination Lane, Creativity City',
  },
  {
    id: 8,
    name: 'Quantum Innovations',
    employee_count: 6,
    address: '543 Quantum Street, Quantum City',
  },
  {
    id: 9,
    name: 'SkyHigh Technologies',
    employee_count: 5,
    address: '789 Skyway Blvd, Skytopia',
  },
  {
    id: 10,
    name: 'Smart Solutions Inc',
    employee_count: 4,
    address: '123 Smart Street, Smart City',
  },
];

let fakeEmployees = [
  {
    id: 1,
    companyId: 1,
    companyName: 'Tech Solutions',
    firstName: 'John',
    lastName: 'Doe',
    position: 'Software Engineer',
  },
  {
    id: 2,
    companyId: 1,
    companyName: 'Tech Solutions',
    firstName: 'Alice',
    lastName: 'Johnson',
    position: 'UX Designer',
  },
  {
    id: 3,
    companyId: 1,
    firstName: 'Bob',
    companyName: 'Tech Solutions',
    lastName: 'Smith',
    position: 'Project Manager',
  },
  {
    id: 4,
    companyId: 1,
    companyName: 'Tech Solutions',
    firstName: 'Emma',
    lastName: 'Brown',
    position: 'Data Analyst',
  },
  {
    id: 5,
    companyId: 1,
    companyName: 'Tech Solutions',
    firstName: 'Chris',
    lastName: 'Miller',
    position: 'Marketing Specialist',
  },
  {
    id: 6,
    companyId: 1,
    companyName: 'Tech Solutions',
    firstName: 'Sophie',
    lastName: 'Clark',
    position: 'HR Coordinator',
  },

  {
    id: 7,
    companyId: 2,
    companyName: 'Innovate Corp',
    firstName: 'Olivia',
    lastName: 'Davis',
    position: 'Graphic Designer',
  },
  {
    id: 8,
    companyId: 2,
    companyName: 'Innovate Corp',
    firstName: 'Liam',
    lastName: 'Anderson',
    position: 'Business Analyst',
  },
  {
    id: 9,
    companyId: 2,
    companyName: 'Innovate Corp',
    firstName: 'Ava',
    lastName: 'Taylor',
    position: 'Software Developer',
  },
  {
    id: 10,
    companyId: 2,
    companyName: 'Innovate Corp',
    firstName: 'Mason',
    lastName: 'Moore',
    position: 'Financial Analyst',
  },
  {
    id: 11,
    companyId: 2,
    companyName: 'Innovate Corp',
    firstName: 'Harper',
    lastName: 'Johnson',
    position: 'Customer Support Representative',
  },

  {
    id: 12,
    companyId: 3,
    companyName: 'Data Innovators',
    firstName: 'Madison',
    lastName: 'Adams',
    position: 'Project Coordinator',
  },
  {
    id: 13,
    companyId: 3,
    companyName: 'Data Innovators',
    firstName: 'Leo',
    lastName: 'Bennett',
    position: 'Data Scientist',
  },
  {
    id: 14,
    companyId: 3,
    companyName: 'Data Innovators',
    firstName: 'Avery',
    lastName: 'Fisher',
    position: 'Marketing Coordinator',
  },
  {
    id: 15,
    companyId: 3,
    companyName: 'Data Innovators',
    firstName: 'Logan',
    lastName: 'Perez',
    position: 'HR Manager',
  },

  {
    id: 16,
    companyId: 4,
    companyName: 'EcoTech Industries',
    firstName: 'Lily',
    lastName: 'Cooper',
    position: 'Data Engineer',
  },
  {
    id: 17,
    companyId: 4,
    companyName: 'EcoTech Industries',
    firstName: 'Finn',
    lastName: 'Reyes',
    position: 'Sales Representative',
  },
  {
    id: 18,
    companyId: 4,
    companyName: 'EcoTech Industries',
    firstName: 'Mia',
    lastName: 'Floyd',
    position: 'Finance Analyst',
  },

  {
    id: 19,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Elijah',
    lastName: 'Price',
    position: 'Security Analyst',
  },
  {
    id: 20,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Isaac',
    lastName: 'Baker',
    position: 'Software Architect',
  },
  {
    id: 21,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Hazel',
    lastName: 'Mills',
    position: 'UX Lead',
  },
  {
    id: 22,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Oscar',
    lastName: 'Gomez',
    position: 'Product Manager',
  },
  {
    id: 23,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Aria',
    lastName: 'Ward',
    position: 'UI Designer',
  },
  {
    id: 24,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Nathan',
    lastName: 'Wells',
    position: 'Operations Manager',
  },
  {
    id: 25,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Aurora',
    lastName: 'Burke',
    position: 'Machine Learning Engineer',
  },
  {
    id: 26,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Caleb',
    lastName: 'Harrison',
    position: 'Customer Success Manager',
  },
  {
    id: 27,
    companyId: 5,
    companyName: 'Global Connect',
    firstName: 'Violet',
    lastName: 'George',
    position: 'Human Resources Specialist',
  },

  {
    id: 28,
    companyId: 6,
    companyName: 'Future Systems',
    firstName: 'Sophia',
    lastName: 'Barnes',
    position: 'System Engineer',
  },
  {
    id: 29,
    companyId: 6,
    firstName: 'Ethan',
    lastName: 'Fisher',
    position: 'UI/UX Designer',
  },
  {
    id: 30,
    companyId: 6,
    companyName: 'Future Systems',
    firstName: 'Ava',
    lastName: 'Watson',
    position: 'Product Manager',
  },
  {
    id: 31,
    companyId: 6,
    companyName: 'Future Systems',
    firstName: 'Mia',
    lastName: 'Wright',
    position: 'Data Scientist',
  },
  {
    id: 32,
    companyId: 6,
    companyName: 'Future Systems',
    firstName: 'Noah',
    lastName: 'Harris',
    position: 'Marketing Specialist',
  },
  {
    id: 33,
    companyId: 6,
    companyName: 'Future Systems',
    firstName: 'Emma',
    lastName: 'Turner',
    position: 'IT Specialist',
  },
  {
    id: 34,
    companyId: 6,
    companyName: 'Future Systems',
    firstName: 'Liam',
    lastName: 'Hill',
    position: 'Financial Analyst',
  },
  {
    id: 35,
    companyId: 6,
    companyName: 'Future Systems',
    firstName: 'Zoe',
    lastName: 'Young',
    position: 'HR Coordinator',
  },

  {
    id: 36,
    companyId: 7,
    companyName: 'Creative Minds Ltd',
    firstName: 'Caleb',
    lastName: 'Smith',
    position: 'Software Developer',
  },
  {
    id: 37,
    companyId: 7,
    companyName: 'Creative Minds Ltd',
    firstName: 'Aria',
    lastName: 'Baker',
    position: 'UX Designer',
  },
  {
    id: 38,
    companyId: 7,
    companyName: 'Creative Minds Ltd',
    firstName: 'Elijah',
    lastName: 'Mills',
    position: 'Project Manager',
  },
  {
    id: 39,
    companyId: 7,
    companyName: 'Creative Minds Ltd',
    firstName: 'Hazel',
    lastName: 'Gomez',
    position: 'Data Analyst',
  },
  {
    id: 40,
    companyId: 7,
    companyName: 'Creative Minds Ltd',
    firstName: 'Oscar',
    lastName: 'Ward',
    position: 'Marketing Specialist',
  },
  {
    id: 41,
    companyId: 7,
    companyName: 'Creative Minds Ltd',
    firstName: 'Lily',
    lastName: 'Harrison',
    position: 'HR Coordinator',
  },
  {
    id: 42,
    companyId: 7,
    companyName: 'Creative Minds Ltd',
    firstName: 'Finn',
    lastName: 'George',
    position: 'System Administrator',
  },

  {
    id: 43,
    companyId: 8,
    companyName: 'Quantum Innovations',
    firstName: 'Zara',
    lastName: 'Clark',
    position: 'Software Engineer',
  },
  {
    id: 44,
    companyId: 8,
    companyName: 'Quantum Innovations',
    firstName: 'Leo',
    lastName: 'Hudson',
    position: 'UX Designer',
  },
  {
    id: 45,
    companyId: 8,
    companyName: 'Quantum Innovations',
    firstName: 'Avery',
    lastName: 'Floyd',
    position: 'Project Manager',
  },
  {
    id: 46,
    companyId: 8,
    companyName: 'Quantum Innovations',
    firstName: 'Logan',
    lastName: 'Ward',
    position: 'Data Analyst',
  },
  {
    id: 47,
    companyId: 8,
    companyName: 'Quantum Innovations',
    firstName: 'Mia',
    lastName: 'Gomez',
    position: 'Marketing Specialist',
  },
  {
    id: 48,
    companyId: 8,
    companyName: 'Quantum Innovations',
    firstName: 'Ethan',
    lastName: 'Bennett',
    position: 'HR Coordinator',
  },

  {
    id: 49,
    companyId: 9,
    companyName: 'SkyHigh Technologies',
    firstName: 'Aria',
    lastName: 'Miller',
    position: 'Software Developer',
  },
  {
    id: 50,
    companyId: 9,
    companyName: 'SkyHigh Technologies',
    firstName: 'Liam',
    lastName: 'Fisher',
    position: 'UX Designer',
  },
  {
    id: 51,
    companyId: 9,
    companyName: 'SkyHigh Technologies',
    firstName: 'Emma',
    lastName: 'Turner',
    position: 'Project Manager',
  },
  {
    id: 52,
    companyId: 9,
    companyName: 'SkyHigh Technologies',
    firstName: 'Noah',
    lastName: 'Hill',
    position: 'Data Analyst',
  },
  {
    id: 53,
    companyId: 9,
    companyName: 'SkyHigh Technologies',
    firstName: 'Sophia',
    lastName: 'Barnes',
    position: 'Marketing Specialist',
  },

  {
    id: 54,
    companyId: 10,
    companyName: 'Smart Solutions Inc',
    firstName: 'Elijah',
    lastName: 'Taylor',
    position: 'Software Engineer',
  },
  {
    id: 55,
    companyId: 10,
    companyName: 'Smart Solutions Inc',
    firstName: 'Isaac',
    lastName: 'Bennett',
    position: 'UX Designer',
  },
  {
    id: 56,
    companyId: 10,
    companyName: 'Smart Solutions Inc',
    firstName: 'Hazel',
    lastName: 'Clark',
    position: 'Project Manager',
  },
  {
    id: 57,
    companyId: 10,
    companyName: 'Smart Solutions Inc',
    firstName: 'Oscar',
    lastName: 'Hudson',
    position: 'Data Analyst',
  },
];

let companyIdCounter = fakeCompanies.length + 1;
let employeeIdCounter = fakeEmployees.length + 1;

const findCompany = (companyId) => {
  return fakeCompanies.find(
    (company) => company.id == companyId || company.name === companyId
  );
};

const findEmployee = (employeeId) => {
  return fakeEmployees.find((employee) => employee.id === employeeId);
};

const findCompanyIdByCompanyName = (companyName) => {
  const foundCompany = fakeCompanies.find(
    (company) => company.name === companyName
  );
  return foundCompany ? foundCompany.id : null;
};

app.get('/companies', (req, res) => {
  res.json(fakeCompanies);
});

app.put('/companies/:id', (req, res) => {
  const companyId = req.params.id;
  const { name, address } = req.body;

  const company = findCompany(companyId);

  if (company) {
    company.name = name !== undefined ? name : company.name;
    company.address = address !== undefined ? address : company.address;

    fakeEmployees.forEach((employee) => {
      if (employee.companyId === companyId) {
        employee.companyId = company.id;
      }
    });

    res.json(company);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
});

app.get('/employees', (req, res) => {
  res.json(fakeEmployees);
});

app.put('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const { lastName, firstName, position, companyId } = req.body;

  const employee = findEmployee(employeeId);

  if (employee) {
    employee.lastName = lastName !== undefined ? lastName : employee.lastName;
    employee.firstName =
      firstName !== undefined ? firstName : employee.firstName;
    employee.position = position !== undefined ? position : employee.position;
    employee.companyId =
      companyId !== undefined ? companyId : employee.companyId;

    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.post('/companies', (req, res) => {
  const newCompany = req.body;

  newCompany.id = companyIdCounter++;

  newCompany.employee_count = 0;

  fakeCompanies.push(newCompany);
  res.json(newCompany);
});

app.post('/employees', (req, res) => {
  const newEmployee = req.body;

  newEmployee.id = employeeIdCounter++;

  const companyId = findCompanyIdByCompanyName(newEmployee.companyName);

  if (companyId !== null) {
    const company = findCompany(companyId);
    if (company) {
      company.employee_count++;
    } else {
      console.error('Company not found');
    }
    newEmployee.companyId = companyId;

    fakeEmployees.push(newEmployee);
    res.json(newEmployee);
  } else {
    res.status(404).json({ message: 'Company not found for employee' });
  }
});

app.delete('/companies', (req, res) => {
  console.log('DELETE /companies endpoint reached');
  const companyIdsToDelete = req.body.companyIds;

  if (!Array.isArray(companyIdsToDelete) || companyIdsToDelete.length === 0) {
    return res
      .status(400)
      .json({ message: 'Invalid or empty array of company IDs' });
  }

  const deletedCompanies = [];
  const deletedEmployees = [];

  companyIdsToDelete.forEach((companyId) => {
    const companyIndex = fakeCompanies.findIndex(
      (company) => company.id === companyId || company.name === companyId
    );

    if (companyIndex !== -1) {
      const deletedCompany = fakeCompanies.splice(companyIndex, 1)[0];
      deletedCompanies.push(deletedCompany);

      const companyEmployees = fakeEmployees.filter(
        (employee) => employee.companyId === companyId
      );
      deletedEmployees.push(...companyEmployees);

      fakeEmployees = fakeEmployees.filter(
        (employee) => employee.companyId !== companyId
      );
    }
  });

  if (deletedCompanies.length > 0) {
    return res.json({
      companies: deletedCompanies,
      employees: deletedEmployees,
    });
  } else {
    return res
      .status(404)
      .json({ message: 'No companies were found for deletion' });
  }
});

app.delete('/employees', (req, res) => {
  console.log('DELETE /employees endpoint reached');
  const employeeIdsToDelete = req.body.employeeIds;

  if (!Array.isArray(employeeIdsToDelete) || employeeIdsToDelete.length === 0) {
    return res
      .status(400)
      .json({ message: 'Invalid or empty array of employee IDs' });
  }

  const deletedEmployees = [];
  let companyIndex;

  employeeIdsToDelete.forEach((employeeId) => {
    const employeeIndex = fakeEmployees.findIndex(
      (employee) => employee.id === employeeId
    );

    if (employeeIndex !== -1) {
      const deletedEmployee = fakeEmployees.splice(employeeIndex, 1)[0];
      deletedEmployees.push(deletedEmployee);

      companyIndex = fakeCompanies.findIndex(
        (company) => company.id === deletedEmployee.companyId
      );

      if (companyIndex !== -1) {
        fakeCompanies[companyIndex].employee_count--;

        console.log('Company after update:', fakeCompanies[companyIndex]);
      }
    }
  });

  if (deletedEmployees.length > 0 && companyIndex !== undefined) {
    return res.json({
      employees: deletedEmployees,
      employee_count: fakeCompanies[companyIndex].employee_count,
    });
  } else {
    return res
      .status(404)
      .json({ message: 'No employees were found for deletion' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
