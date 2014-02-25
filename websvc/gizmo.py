
class Gizmo(object):
    """ Class to write data into file for mapreduce module"""    
    # 'private properties'
    _reportToFile_mapper = { 'click_count' : 'files/clicks.log', 
                     'click_time': 'files/click_time.log' }

    
    def __init__(self,payload):
        self.report_type = payload.getReportType()
        self.file_payload = payload.getFilePayload()
        self.writeToFile()

    def writeToFile(self):
        with open(self._reportToFile_mapper[self.report_type],'w') as writefile:
            writefile.write(self.payload)


class pigdog:
    """ Class to parse incoming payload from teatree and convert into format suitable for writing into file """

    # 'private' properties 


    # public methods
    def __init__(self,payload):
        # parse input to webservice here
        pass

    def getReportType(self,payload,report_type):
       """ parse JSON and figure out click/clicktime """
       pass

    def getFilePayload(self,payload):
       pass


#if __name__ == '__main__':
#    pass

