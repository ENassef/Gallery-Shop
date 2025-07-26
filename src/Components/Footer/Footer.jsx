import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        


        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Facebook size={20} />
          </a>
          <a href="https://www.linkedin.com/in/eslam-nassef-08828a32b/" className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
            <Linkedin size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center py-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Eslam Nassef. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}