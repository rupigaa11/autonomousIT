# autonomousIT

Initially the user interacts with the web application where the user would give all the required parameters for the cloud and stack formation in AWS. The parameters are then passed to the template. The AWS-CloudFormation/ARM Template is in the form of YAML format. The template is where the parameter definition, resource creation, configuration action for the cloud and stack creation is provided.  It consists of parameters definition for  Instance type, SSH Location, Database Name, Key-pair value. 

This template is passed to AWS to the cloud formation for the creation of stack instances. Then the client would be able to view the list of stack that has been created in the AWS. 
