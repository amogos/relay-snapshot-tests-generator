const mutationTemplate = (filename:string):string => {
return `
//  Generated by relay-snapshot-test-generator 
import React from 'react';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
import ReactTestRenderer from 'react-test-renderer';
import {QueryRenderer, graphql, commitMutation} from 'react-relay';

function sendMutation(environment, onCompleted, onError, variables) {
  commitMutation(environment, {
    mutation: graphql\`
      mutation ${filename}Mutation($firstName: String!, $lastName: String!) {
       # todo: add mutation call here
      }
    \`,
    onCompleted,
    onError,
    variables,
  });
}

test('${filename} mutation', () => {
  const environment = createMockEnvironment();
  const onCompleted = jest.fn();
  sendMutation(environment, onCompleted, jest.fn(), {
    /*no variables*/
  });
  const operation = environment.mock.getMostRecentOperation();
  environment.mock.resolve(operation, MockPayloadGenerator.generate(operation));
  expect(onCompleted).toBeCalled();
});

`;
}

export default mutationTemplate;