import Controller from '@ember/controller';
import { computed } from '@ember/object';

const columns = [
  {
    id: 'id',
    name: "Id",
    width: 150,
    minWidth: 50,
    key: "id",
    sortable: true,
    filterable: true
  },
  {
    id: 'first-name',
    name: "First Name",
    width: 90,
    minWidth: 50,
    filterable: true,
    sortable: true,
    key: "firstName"
  },
  {
    id: 'last-name',
    name: "Last Name",
    width: 100,
    minWidth: 50,
    filterable: true,
    sortable: true,
    key: "lastName"
  },
  {
    id: 'company',
    name: "Company",
    width: 85,
    minWidth: 50,
    filterable: true,
    sortable: true,
    key: "company"

  },
  {
    id: 'address',
    name: "Address",
    width: 130,
    minWidth: 50,
    filterable: true,
    sortable: true,
    key: "address"
  },
  {
    id: 'phone-number',
    name: "Phone Number",
    width: 250,
    minWidth: 50,
    filterable: true,
    sortable: true,
    key: "phoneNumber"
  },
  {
    id: 'email',
    name: "Email",
    width: 200,
    minWidth: 50,
    key: "email",
    filterable: true,
    sortable: true,
  },{
    id: 'empty',
    name: '',
    width: 200
  }
];

export default Controller.extend({
  columns,

  rowData: computed(function(){
    let rows = [];

    for(let i = 0; i < 100; i++){
      rows.push({
        id: i,
        firstName: `Person ${i}`,
        lastName: `The ${i}`,
        company: `Company ${i}`,
        address: `Street ${i}`,
        phoneNumber: `${i}${i}${i}${i}${i}${i}${i}${i}${i}`,
        email: `some${i}@domain${i}.com`
      });
    }

    return rows;
  })
});

