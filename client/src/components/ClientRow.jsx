import { FaTrash } from 'react-icons/fa';
import {useMutation} from '@apollo/client'
import {DELETE_CLIENT} from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ClientRow({client}) {

  const [deleteClient] = useMutation(DELETE_CLIENT,{
    variables: { id: client.id },
    // refetchQueries: [{query: GET_CLIENTS}]         First method without reloading the deleted
    update(cache, {data: { deleteClient }}){       // Second method
      const {clients} = cache.readQuery({ query:
        GET_CLIENTS});
        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: clients.filter(client=> client.id!== deleteClient.id) },
        })
    }
  });

  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td className='d-flex justify-content-center align-items-center'>
            <button className="btn btn-danger"
            onClick={deleteClient}>
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
