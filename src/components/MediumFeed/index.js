import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { Col, Row, Container } from "react-bootstrap"
import FeedItemSmall from './FeedItemSmall'
import FeedItem from './FeedItem'
import "./style.sass"


const MediumFeed = ({title, mediumUrl, small, limit=100}) => {

  const [loading, setLoading] = useState(true)
  const [feed, setFeed] = useState(null)

  useEffect(() => {
    getFeed()
  }, [])
  
  const getFeed = () => {
    const feedFetchUrl = `https://api.rss2json.com/v1/api.json?rss_url=${mediumUrl}`
    setLoading(true)
    fetch(feedFetchUrl).then((res) => res.json()).then((data) => {
      setFeed(data)
      setLoading(false)
    })
    .catch((err) => { throw err });
  }

  const renderSmallFeedItemList = () => {
    return feed.items.map((item, index) => {
      if (index < limit) {
        return (
          <FeedItemSmall 
            key={item.guid}
            title={item.title}
            publishedDate={item.pubDate}
            image={item.thumbnail}
            author={item.author}
            slug={item.link}
          />
        )
      }
    })
  }

  const renderFeedItemList = () => (
    <Container>
      <Row>
        {feed.items.map(item => (
            <Col md={6} key={item.guid}>
              <FeedItem
                title={item.title}
                publishedDate={item.pubDate}
                image={item.thumbnail}
                author={item.author}
                slug={item.link}
              />
            </Col>
          ))}
      </Row>
    </Container>
  )

  return (
    <div className="medium-feed-component">
      <p className="medium-feed-title">{title}</p>
      {loading || !feed ? <span /> : (
        small ? renderSmallFeedItemList() : renderFeedItemList()
      )}
    </div>
  )
}

MediumFeed.propTypes = {
  title: PropTypes.string,
  mediumUrl: PropTypes.string,
  small: PropTypes.bool,
  limit: PropTypes.number
}

export default MediumFeed