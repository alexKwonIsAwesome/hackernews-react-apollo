import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateLink extends React.Component {
  state = {
    description: '',
    url: '',
  }

  _createLink = async () => {
    const { postMutation } = this.props;
    const { description, url } = this.state;
    await postMutation({
      variables: {
        description,
        url
      }
    });
  }

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button onClick={() => this._createLink()} >Submit</button>
      </div>
    );
  }
}

const POST_MUTATION = gql`
  # 2
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export default graphql(POST_MUTATION, { name: 'postMutation' })(CreateLink);