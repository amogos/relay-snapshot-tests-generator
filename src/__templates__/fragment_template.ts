const fragmentTemplate = (filename: string): string => {
  return `import React from 'react';
    import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
    import ReactTestRenderer from 'react-test-renderer';
    import {QueryRenderer, graphql} from 'react-relay';
    //  TODO: replace fragment component with the real tested component
    import  ${filename}Component from './${filename}Component';
    
    test('Fragment ${filename} Container', () => {
      const environment = createMockEnvironment();
      const TestRenderer = () => (
        <QueryRenderer
          environment={environment}
          query={graphql\`
            query  ${filename}Query @relay_test_operation {
              # TODO: replace with real fragment
              fragment(id: "test-id") {
                ..Fragment_fragment
              }
            }
          \`}
          variables={{}}
          render={({error, props}) => {
            if (props) {
              //  TODO: replace fragment component and props
              return <${filename}Component node={props.fragment} />;
            } else if (error) {
              return error.message;
            }
            return 'Loading...';
          }}
        />
      );
      const renderer = ReactTestRenderer.create(<TestRenderer />);
      environment.mock.resolveMostRecentOperation(operation =>
        MockPayloadGenerator.generate(operation),
      );
    
      expect(renderer).toMatchSnapshot();
    });`;
};

export default fragmentTemplate;