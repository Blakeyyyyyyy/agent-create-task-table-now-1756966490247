const axios = require('axios');

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const BASE_ID = 'appEZQLiRm9cfnVkP'; // Growth AI base
const AIRTABLE_API = 'https://api.airtable.com/v0';

async function createTable() {
  try {
    console.log('Creating Task Lists table in Growth AI base...');
    
    const tableData = {
      name: 'Task Lists',
      fields: [
        {
          name: 'Task Name',
          type: 'singleLineText'
        },
        {
          name: 'Assigned To',
          type: 'singleSelect',
          options: {
            choices: [
              { name: 'Vanessa', color: 'blueLight2' },
              { name: 'Blake', color: 'cyanLight2' },
              { name: 'Beau', color: 'tealLight2' },
              { name: 'Chris', color: 'greenLight2' },
              { name: 'Liam', color: 'yellowLight2' },
              { name: 'Tevon', color: 'orangeLight2' }
            ]
          }
        },
        {
          name: 'Status',
          type: 'singleSelect',
          options: {
            choices: [
              { name: 'Not Started', color: 'grayLight2' },
              { name: 'In Progress', color: 'yellowLight2' },
              { name: 'Review', color: 'orangeLight2' },
              { name: 'Completed', color: 'greenLight2' },
              { name: 'On Hold', color: 'redLight2' }
            ]
          }
        },
        {
          name: 'Priority',
          type: 'singleSelect',
          options: {
            choices: [
              { name: 'Low', color: 'grayLight2' },
              { name: 'Medium', color: 'yellowLight2' },
              { name: 'High', color: 'orangeLight2' },
              { name: 'Urgent', color: 'redLight2' }
            ]
          }
        },
        {
          name: 'Due Date',
          type: 'date',
          options: {
            dateFormat: {
              name: 'local'
            }
          }
        },
        {
          name: 'Description',
          type: 'multilineText'
        },
        {
          name: 'Progress %',
          type: 'number',
          options: {
            precision: 0
          }
        },
        {
          name: 'Date Created',
          type: 'createdTime',
          options: {
            dateFormat: {
              name: 'local'
            },
            includeTime: true
          }
        },
        {
          name: 'Last Modified',
          type: 'lastModifiedTime',
          options: {
            dateFormat: {
              name: 'local'
            },
            includeTime: true
          }
        },
        {
          name: 'Time Estimate (Hours)',
          type: 'number',
          options: {
            precision: 1
          }
        },
        {
          name: 'Tags',
          type: 'multipleSelects',
          options: {
            choices: [
              { name: 'Development', color: 'blueLight2' },
              { name: 'Marketing', color: 'greenLight2' },
              { name: 'Design', color: 'purpleLight2' },
              { name: 'Client Work', color: 'orangeLight2' },
              { name: 'Admin', color: 'grayLight2' },
              { name: 'Research', color: 'cyanLight2' },
              { name: 'Meeting', color: 'yellowLight2' }
            ]
          }
        },
        {
          name: 'Notes',
          type: 'multilineText'
        }
      ]
    };

    const response = await axios.post(`${AIRTABLE_API}/meta/bases/${BASE_ID}/tables`, tableData, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ SUCCESS! Task Lists table created!');
    console.log(`Table ID: ${response.data.id}`);
    console.log(`Fields created: ${response.data.fields.length}`);
    console.log('Team members configured: Vanessa, Blake, Beau, Chris, Liam, Tevon');
    
    return {
      success: true,
      tableId: response.data.id,
      message: 'Task Lists table created successfully!'
    };

  } catch (error) {
    console.error('❌ Error creating table:', error.message);
    if (error.response) {
      console.error('API Error:', JSON.stringify(error.response.data, null, 2));
    }
    return {
      success: false,
      error: error.message
    };
  }
}

// Run immediately
createTable().then(result => {
  console.log('Final result:', result);
  process.exit(result.success ? 0 : 1);
});