import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import ProjectsView from './components/ProjectsView';
import BlogView from './components/BlogView';
import ContactWidgets from './components/ContactWidgets';
import DynamicBackground from './components/DynamicBackground';
import AdminView from './components/AdminView';
import { Toaster } from 'react-hot-toast';
import { PROJECTS, BLOG_POSTS } from './data';
import { Project, BlogPost } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [quotationData, setQuotationData] = useState<{
    serviceType: string;
    budget: string;
    message: string;
  } | null>(null);

  // Stateful list for portfolio projects with local preservation
  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    const saved = localStorage.getItem('uphostix_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return PROJECTS;
  });

  // Stateful list for publications blog posts with local preservation
  const [blogPostsList, setBlogPostsList] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('uphostix_blogposts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return BLOG_POSTS;
  });

  // Check URL pathname for direct admin access
  useEffect(() => {
    const checkPath = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentTab('admin');
      }
    };
    checkPath();
    // Intercept navigation
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, []);

  const handleAddProject = (newProj: Project) => {
    const updated = [newProj, ...projectsList];
    setProjectsList(updated);
    localStorage.setItem('uphostix_projects', JSON.stringify(updated));
  };

  const handleDeleteProject = (id: string) => {
    const updated = projectsList.filter((p) => p.id !== id);
    setProjectsList(updated);
    localStorage.setItem('uphostix_projects', JSON.stringify(updated));
  };

  const handleAddBlogPost = (newBlog: BlogPost) => {
    const updated = [newBlog, ...blogPostsList];
    setBlogPostsList(updated);
    localStorage.setItem('uphostix_blogposts', JSON.stringify(updated));
  };

  const handleDeleteBlogPost = (id: string) => {
    const updated = blogPostsList.filter((b) => b.id !== id);
    setBlogPostsList(updated);
    localStorage.setItem('uphostix_blogposts', JSON.stringify(updated));
  };

  const handleSetQuotation = (data: { serviceType: string; budget: string; message: string }) => {
    setQuotationData(data);
  };

  const clearInitialQuotation = () => {
    setQuotationData(null);
  };

  // Safe navigation function wrapped to reset states dynamically
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    if (tabId !== 'projects') setSelectedProjectId(null);
    if (tabId !== 'blog') setSelectedBlogPostId(null);
    
    // Smooth scroll page helper
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render content based on active nav tab
  const renderViewContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeView
            setCurrentTab={handleTabChange}
            onSelectProject={(id) => {
              setSelectedProjectId(id);
              setCurrentTab('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectBlogPost={(id) => {
              setSelectedBlogPostId(id);
              setCurrentTab('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'services':
        return (
          <ServicesView
            setCurrentTab={handleTabChange}
            setSelectedQuotation={handleSetQuotation}
          />
        );
      case 'projects':
        return (
          <ProjectsView
            projects={projectsList}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            setCurrentTab={handleTabChange}
          />
        );
      case 'blog':
        return (
          <BlogView
            posts={blogPostsList}
            selectedBlogPostId={selectedBlogPostId}
            onSelectBlogPost={setSelectedBlogPostId}
          />
        );
      case 'about':
        return <AboutView />;
      case 'contact':
        return (
          <ContactView
            initialQuotationData={quotationData}
            clearInitialQuotation={clearInitialQuotation}
          />
        );
      case 'admin':
        return (
          <AdminView
            projects={projectsList}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
            blogPosts={blogPostsList}
            onAddBlogPost={handleAddBlogPost}
            onDeleteBlogPost={handleDeleteBlogPost}
          />
        );
      default:
        return (
          <HomeView
            setCurrentTab={handleTabChange}
            onSelectProject={(id) => {
              setSelectedProjectId(id);
              setCurrentTab('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectBlogPost={(id) => {
              setSelectedBlogPostId(id);
              setCurrentTab('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 font-sans text-slate-300 antialiased selection:bg-blue-600/30 selection:text-white relative z-0">
      {/* Premium Artificial Intelligence & Dev Dynamic Motion Backdrop */}
      <DynamicBackground />

      {/* Dynamic Navigation Bar sticky on scroll */}
      <Navbar currentTab={currentTab} setCurrentTab={handleTabChange} />

      {/* Main interactive area wrapper with subtle animation cues */}
      <main className="flex-grow">
        <div className="transition-all duration-300 py-1">
          {renderViewContent()}
        </div>
      </main>

      {/* Bottom Footer block containing maps and legalities */}
      <Footer setCurrentTab={handleTabChange} />

      {/* Floating contact widgets for Phone, Zalo, and Messenger */}
      <ContactWidgets />

      {/* Modern Toast Alert Notification Controller */}
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(12px)',
            color: '#f8fafc',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            padding: '12px 18px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}
