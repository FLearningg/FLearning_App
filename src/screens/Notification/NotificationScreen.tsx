import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SectionList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/services/notificationService";
import { AppDispatch } from "../../redux/store";
import { notificationScreenStyles } from "../../../assets/styles/NotificationScreen/NotificationScreenStyles";
import LoadingComponent from "../../components/Loading/LoadingComponent";

const PAGE_SIZE = 10;
const RENDER_STEP = 7;

const NotificationScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const notificationData = useSelector(
        (state: any) => state.notifications.getNotifications.notifications
    ) || [];
    const loadingFetching = useSelector((state: any) => state.notifications.getNotifications.isLoading);
    interface NotificationItem {
        _id: string;
        userId: string;
        message: string;
        readStatus: boolean;
        createdAt: string;
        updatedAt?: string;
    }

    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [page, setPage] = useState(1);
    const [hasMoreApi, setHasMoreApi] = useState(true);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(RENDER_STEP);
    const [showInfinite, setShowInfinite] = useState(false);

    const fetchNotificationPage = async (pageNum: number) => {
        setLoading(true);
        try {
            const start = (pageNum - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const pageData = notificationData.slice(start, end);

            if (pageData.length > 0) {
                setNotifications((prev) => [...prev, ...pageData]);
                if (end >= notificationData.length) setHasMoreApi(false);
            } else {
                setHasMoreApi(false);
            }
        } catch (error) {
            console.error("Error fetching notification page:", error);
            setHasMoreApi(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                await getNotifications(dispatch, currentUser?._id, 1, PAGE_SIZE);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchInitial();
    }, [dispatch, currentUser?._id]);

    useEffect(() => {
        if (notificationData.length > 0) {
            setNotifications([]);
            setPage(1);
            setHasMoreApi(true);
            setVisibleCount(RENDER_STEP);
            setShowInfinite(false);
            fetchNotificationPage(1);
        }
    }, [notificationData]);

    const handleLoadMore = () => {
        if (
            visibleCount + RENDER_STEP > notifications.length &&
            hasMoreApi &&
            !loading
        ) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchNotificationPage(nextPage);
        }
        setVisibleCount((prev) => prev + RENDER_STEP);
    };

    const getDateLabel = (isoString: string) => {
        const dateObj = new Date(isoString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isToday = dateObj.toDateString() === today.toDateString();
        const isYesterday = dateObj.toDateString() === yesterday.toDateString();

        if (isToday) return "Today";
        if (isYesterday) return "Yesterday";

        return dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const notificationsWithDate = notifications.slice(0, visibleCount).map((n: any) => ({
        ...n,
        dateGroup: getDateLabel(n.createdAt),
    }));

    const groupedNotifications = notificationsWithDate.reduce((acc, notif) => {
        const date = notif.dateGroup;
        if (!acc[date]) acc[date] = [];
        acc[date].push(notif);
        return acc;
    }, {} as Record<string, any[]>);

    const sections = Object.keys(groupedNotifications).map((date) => ({
        title: date,
        data: groupedNotifications[date],
    }));

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={notificationScreenStyles.notificationCard}>
            <View style={notificationScreenStyles.iconContainer}>
                <Ionicons name="notifications-outline" size={24} color="##202244" />
            </View>
            <View style={notificationScreenStyles.textContainer}>
                <Text style={notificationScreenStyles.description} numberOfLines={2} ellipsizeMode="tail">{item.message}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ section }: { section: any }) => (
        <View style={notificationScreenStyles.sectionHeader}>
            <Text style={notificationScreenStyles.sectionTitle}>{section.title}</Text>
        </View>
    );

    return (
        <View style={notificationScreenStyles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.2}
                ListFooterComponent={loading ? <ActivityIndicator /> : null}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <LoadingComponent visible={loadingFetching} />
        </View>
    );
};

export default NotificationScreen;
