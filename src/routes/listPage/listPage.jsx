import React, { useEffect, useState } from 'react';
import './listPage.scss';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
import { Await, useLoaderData, useSearchParams } from 'react-router-dom';
import { Suspense } from 'react';
import apiRequest from '../../lib/apiRequest';

function ListPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const fetchPosts = async (page) => {
    try {
      const type = searchParams.get('type') || '';
      const city = searchParams.get('city') || '';
      const minPrice = searchParams.get('minPrice') || 0;
      const maxPrice = searchParams.get('maxPrice') || 0;
      const property = searchParams.get('property') || '';
      const bedroom = searchParams.get('bedroom') || '';

      const res = await apiRequest.get(`/posts?page=${page}&limit=5&type=${type}&city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}&property=${property}&bedroom=${bedroom}`);
      setPosts(res.data.posts);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError('Error loading posts!');
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, searchParams]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {error && <div className="error">{error}</div>}
          <Suspense fallback={<p>Loading...</p>}>
            {posts.map((post) => (
              <Card key={post.id} item={post} />
            ))}
          </Suspense>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Map items={posts} />
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
