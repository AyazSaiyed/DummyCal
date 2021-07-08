""" Client for Agora Restful API's """
import requests

class FlatFileAPI:
    BASE_URL = 'https://api.us.flatfile.io'
    TEST_URL = ''

    def __init__(self, accessKeyID='', secretKey='', test=False):
        self.headers = {}

        if test:
            self.url = f'{self.TEST_URL}'
        else:
            self.url = self.BASE_URL

        if accessKeyID and secretKey:
            credentials = f'{accessKeyID}{secretKey}'
            self.headers['X-Api-Key'] = credentials

    def accessKeyExchange(self, payload):
        """
            POST Request
            body: accessKeyId*, secretAccessKey*, expiresIn
        """
        r = requests.post(
            f'{self.url}/auth​/access-key​/exchange', 
            json=payload,
            headers=self.headers
        )
        if r.status_code == 201:
            return r.json()
        r.raise_for_status()

    def exportAsCSV(self, batchId, query):
        """
            GET Request
            query params: type*, batchId*
        """
        r = requests.get(
            f'{self.url}/batch/{batchId}/export.csv', 
            params=query['type'],
            headers=self.headers
        )
        if r.status_code == requests.codes.OK:
            return r.json()
        r.raise_for_status()

    def listBatches(self, query):
        """
            GET Request
            query params: take, skip, workspaceId, endUserId, search, licenseKey*
        """        
        r = requests.get(
            f'{self.url}/rest/batches', 
            params=query,
            headers=self.headers
        )
        if r.status_code == requests.codes.OK:
            return r.json()
        r.raise_for_status()

    def getBatch(self, batchId):
        """
            GET Request
            query params: id*
        """
        r = requests.get(
            f'{self.url}/rest/batch/{batchId}',
            headers=self.headers
        )
        if r.status_code == requests.codes.OK:
            return r.json()
        r.raise_for_status()

    def getBatchRows(self, batchId, query):
        """
            GET Request
            query params: 
                id*, skip, take, deleted, valid, 
                createdAtStartDate, createdAtEndDate, 
                updatedAtStartDate, updateAtEndDate
        """
        r = requests.get(
            f'{self.url}/rest/batch/{batchId}/rows',
            params=query,
            headers=self.headers
        )
        if r.status_code == requests.codes.OK:
            return r.json()
        r.raise_for_status()

    def listWorkspacesByTeam(self, teamId, query):
        """
            GET Request
            query params: teamId*, skip, take
        """
        r = requests.get(
            f'{self.url}/rest/teams/{teamId}/workspaces',
            params=query,
            headers=self.headers
        )
        if r.status_code == requests.codes.OK:
            return r.json()
        r.raise_for_status()

    def getWorkspace(self, WorkspaceId, query):
        """
            GET Request
            query params: id*, teamId*
        """ 
        r = requests.get(
            f'{self.url}/rest/workspace/{WorkspaceId}',
            params=query,
            headers=self.headers
        )
        if r.status_code == requests.codes.OK:
            return r.json()
        r.raise_for_status()