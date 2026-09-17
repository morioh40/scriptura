import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Home');

  const bookItems = [
    'Genesis',
    'Exodus',
    'Matthew',
    'John',
    'Romans',
    'Revelation',
  ];
  const forumItems = [
    {
      title: 'How do I strengthen my faith during difficult times?',
      comments: 24,
      time: '2 hours ago',
    },
    { title: 'Favorite Bible verses and why', comments: 47, time: '1 day ago' },
    {
      title: 'Prayer requests for September',
      comments: 33,
      time: '2 days ago',
    },
  ];

  const renderNavItem = (label, icon, tab) => (
    <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab(tab)}>
      <Ionicons
        name={icon}
        size={24}
        color={activeTab === tab ? '#3a6b7e' : '#6c757d'}
      />
      <Text
        style={[styles.navLabel, activeTab === tab && styles.navLabelActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3a6b7e" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Ionicons name="book-outline" size={24} color="#d39d5b" />
            <Text style={styles.logoText}>Scriptura</Text>
          </View>
          <View style={styles.userActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-circle-outline" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Verse Card */}
        <View style={[styles.card, styles.dailyVerse]}>
          <Text style={styles.verseText}>
            "For God so loved the world that he gave his one and only Son, that
            whoever believes in him shall not perish but have eternal life."
          </Text>
          <Text style={styles.verseRef}>John 3:16 (NIV)</Text>
        </View>

        {/* Daily Prayer Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Daily Prayer</Text>
            <Ionicons name="rose-outline" size={20} color="#3a6b7e" />
          </View>
          <Text style={styles.prayerText}>
            Heavenly Father, thank you for this new day. Guide my thoughts,
            words, and actions to honor You. Help me to show love and compassion
            to others as You have shown to me.
          </Text>
          <TouchableOpacity style={styles.readMore}>
            <Text style={styles.readMoreText}>
              More Prayers{' '}
              <Ionicons name="arrow-forward" size={14} color="#3a6b7e" />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Daily Devotion Card */}
        <View style={styles.card}>
          <View style={styles.devotionHeader}>
            <Ionicons name="book-outline" size={20} color="#d39d5b" />
            <Text style={styles.devotionTitle}>
              Today's Devotion: Trust in the Lord
            </Text>
          </View>
          <View style={styles.devotionContent}>
            <Text style={styles.devotionVerse}>
              Trust in the LORD with all your heart and lean not on your own
              understanding; in all your ways submit to him, and he will make
              your paths straight. - Proverbs 3:5-6
            </Text>
            <Text style={styles.devotionText}>
              In times of uncertainty, we are called to rely not on our own
              limited perspective but on God's infinite wisdom...
            </Text>
          </View>
          <TouchableOpacity style={styles.readMore}>
            <Text style={styles.readMoreText}>
              Read Full Devotion{' '}
              <Ionicons name="arrow-forward" size={14} color="#3a6b7e" />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Books of the Bible</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.booksGrid}>
            {bookItems.map((book, index) => (
              <TouchableOpacity key={index} style={styles.bookItem}>
                <Ionicons name="book-outline" size={28} color="#8a5a44" />
                <Text style={styles.bookName}>{book}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Forums Preview */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Community Discussions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {forumItems.map((item, index) => (
            <View
              key={index}
              style={[
                styles.forumItem,
                index === forumItems.length - 1 && styles.lastForumItem,
              ]}
            >
              <View style={styles.forumIcon}>
                <Ionicons
                  name="chatbubbles-outline"
                  size={20}
                  color="#3a6b7e"
                />
              </View>
              <View style={styles.forumContent}>
                <Text style={styles.forumTitle}>{item.title}</Text>
                <Text style={styles.forumMeta}>
                  {item.comments} comments • Started {item.time}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {renderNavItem('Home', 'home-outline', 'Home')}
        {renderNavItem('Bible', 'book-outline', 'Bible')}
        {renderNavItem('Prayer', 'rose-outline', 'Prayer')}
        {renderNavItem('Community', 'people-outline', 'Community')}
        {renderNavItem('Profile', 'person-outline', 'Profile')}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7f9',
  },
  header: {
    backgroundColor: '#3a6b7e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dailyVerse: {
    backgroundColor: '#3a6b7e',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  verseText: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
  },
  verseRef: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    textAlign: 'right',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3a6b7e',
  },
  viewAll: {
    color: '#3a6b7e',
    fontSize: 14,
    fontWeight: '500',
  },
  prayerText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#343a40',
    marginBottom: 8,
  },
  readMore: {
    marginTop: 4,
  },
  readMoreText: {
    color: '#3a6b7e',
    fontSize: 14,
    fontWeight: '500',
  },
  devotionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  devotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    marginLeft: 8,
  },
  devotionContent: {
    marginBottom: 4,
  },
  devotionVerse: {
    fontSize: 14,
    lineHeight: 22,
    color: '#343a40',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  devotionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6c757d',
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookItem: {
    backgroundColor: '#f1f5f7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: '30%',
    marginBottom: 10,
  },
  bookName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#343a40',
    marginTop: 4,
  },
  forumItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastForumItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  forumIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  forumContent: {
    flex: 1,
    justifyContent: 'center',
  },
  forumTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 2,
  },
  forumMeta: {
    fontSize: 12,
    color: '#6c757d',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 11,
    color: '#6c757d',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#3a6b7e',
    fontWeight: '600',
  },
});
