import { CreateClientDTO } from "../../db/dto/client.dto";
import Client from "../../db/models/client";
import Project from "../../db/models/project";
import { HttpError } from "../../types/error";

export const createClient = async (payload: CreateClientDTO) => {
  try {
    const { name } = payload;
    if (!name) throw new HttpError('BadRequest', 'Provide client name');

    const client = await Client.create({ name });
    return client;
  } catch (error) {
    throw new HttpError('ServerError');
  }
}

export const getClients = async () => {
  try {
    const clients = await Client.findAll();
    return clients;
  } catch (error) {
    throw new HttpError('ServerError');
  }
}

export const getClientById = async (id: number) => {
  try {
    if (!id) throw new HttpError('BadRequest', 'Provide client id');

    const client = await Client.findByPk(id);
    return client;
  } catch (error) {
    throw new HttpError('ServerError');
  }
}

export const updateClient = async (id: number, payload: CreateClientDTO) => {
  const { name } = payload;
  try {
    if (!id) throw new HttpError('BadRequest', 'Provide client id');

    const client = await Client.findByPk(id);

    if (!client) {
      throw new HttpError('NotFound', 'Client not found');
    }

    await client.update({ name });
    const updatedClient = await Client.findByPk(id);
    return updatedClient;
  } catch (error) {
    throw new HttpError('ServerError');
  }
}

export const deleteClient = async (id: number) => {
  try {
    if (!id) throw new HttpError('BadRequest', 'Provide client id');

    const client = await Client.findByPk(id);

    if (!client) {
      throw new HttpError('NotFound', 'Client not found');
    }

    await client.destroy();
    return {};
  } catch (error) {
    throw new HttpError('ServerError');
  }
}

export const addClientToProject = async (projectId: number, clientId: number) => {
  try {
    if (!projectId || !clientId) throw new HttpError('BadRequest', 'Provide client id');

    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new HttpError('NotFound', 'Project not found');
    }

    const client = await Client.findByPk(clientId);

    if (!client) {
      throw new HttpError('NotFound', 'Client not found');
    }

    await client.addProject(project);
    const updatedProject = await Project.findByPk(projectId, {
      include: [{ model: Client }],
    });
    return updatedProject;
  } catch (error) {
    console.log(error);
    throw new HttpError('ServerError');
  }
}